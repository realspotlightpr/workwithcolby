const HIGHLEVEL_API = "https://services.leadconnectorhq.com";
const LOCATION_ID = "Pc7d2XVnZJM0qv65EScr";
const PIPELINE_ID = "33ABN02hxEsRO8y2S81i";
const NEW_LEAD_STAGE_ID = "235572f0-e54f-4752-a236-0c54fd2c9a96";

const allowedResources = new Set([
  "Seven SEO Agent Prompts",
  "SEO Dashboard Agent Pack",
]);

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

async function highLevelRequest(path, options, token) {
  const result = await fetch(`${HIGHLEVEL_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const payload = await result.json().catch(() => ({}));
  if (!result.ok) {
    const error = new Error(`HighLevel request failed (${result.status})`);
    error.statusCode = result.status;
    error.details = payload;
    throw error;
  }
  return payload;
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return response(405, { error: "Method not allowed" });
  }

  const token = process.env.HIGHLEVEL_INTEGRATION_KEY;
  if (!token) {
    console.error("HIGHLEVEL_INTEGRATION_KEY is not configured");
    return response(503, { error: "Lead capture is temporarily unavailable" });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (_error) {
    return response(400, { error: "Invalid request" });
  }

  if (String(data.companyWebsite || "").trim()) {
    return response(200, { ok: true });
  }

  const name = String(data.name || "").trim().slice(0, 120);
  const email = String(data.email || "").trim().toLowerCase().slice(0, 254);
  const resource = String(data.resource || "").trim();
  const pageUrl = String(data.pageUrl || "").trim().slice(0, 500);

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !allowedResources.has(resource)) {
    return response(422, { error: "Please provide a valid name and email" });
  }

  try {
    const contactResult = await highLevelRequest(
      "/contacts/upsert",
      {
        method: "POST",
        body: JSON.stringify({
          locationId: LOCATION_ID,
          name,
          email,
          source: "Work with Colby resource library",
          tags: ["SEO Resource Lead", resource],
        }),
      },
      token,
    );

    const contactId =
      contactResult.contact && contactResult.contact.id
        ? contactResult.contact.id
        : contactResult.id;

    if (!contactId) throw new Error("HighLevel did not return a contact ID");

    await highLevelRequest(
      "/opportunities/",
      {
        method: "POST",
        body: JSON.stringify({
          pipelineId: PIPELINE_ID,
          pipelineStageId: NEW_LEAD_STAGE_ID,
          locationId: LOCATION_ID,
          contactId,
          name: `${name} — ${resource}`,
          status: "open",
          source: pageUrl || "workwithcolby.com resource article",
        }),
      },
      token,
    );

    return response(200, { ok: true });
  } catch (error) {
    console.error("HighLevel lead capture failed", {
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    });
    return response(502, {
      error: "We could not save your request. Please try again.",
    });
  }
};
