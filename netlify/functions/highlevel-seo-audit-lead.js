const HIGHLEVEL_API = "https://services.leadconnectorhq.com";
const LOCATION_ID = "Pc7d2XVnZJM0qv65EScr";
const PIPELINE_ID = "0cKAQgpY3V3FUvmeqCGL";
const NEW_LEAD_STAGE_ID = "8fdeba96-8a8c-418d-8ddf-9a05608b4484";

function response(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(body) };
}

async function highLevelRequest(path, options, token) {
  const result = await fetch(`${HIGHLEVEL_API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json", "Content-Type": "application/json" },
  });
  const payload = await result.json().catch(() => ({}));
  if (!result.ok) { const error = new Error(`HighLevel request failed (${result.status})`); error.statusCode = result.status; throw error; }
  return payload;
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") return response(405, { error: "Method not allowed" });
  const token = process.env.HIGHLEVEL_INTEGRATION_KEY;
  if (!token) return response(503, { error: "Audit requests are temporarily unavailable" });

  let data;
  try { data = JSON.parse(event.body || "{}"); } catch (_error) { return response(400, { error: "Invalid request" }); }
  if (String(data.companyWebsite || "").trim()) return response(200, { ok: true });

  const name = String(data.name || "").trim().slice(0, 120);
  const email = String(data.email || "").trim().toLowerCase().slice(0, 254);
  const phone = String(data.phone || "").trim().slice(0, 40);
  const pageUrl = String(data.pageUrl || "").trim().slice(0, 500);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, "").length < 7) {
    return response(422, { error: "Please provide a valid name, email, and phone number" });
  }

  try {
    const contactResult = await highLevelRequest("/contacts/upsert", { method: "POST", body: JSON.stringify({ locationId: LOCATION_ID, name, email, phone, source: "Work with Colby free SEO audit", tags: ["Free SEO Audit", "SEO Service Lead"] }) }, token);
    const contactId = contactResult.contact?.id || contactResult.id;
    if (!contactId) throw new Error("HighLevel did not return a contact ID");
    await highLevelRequest("/opportunities/", { method: "POST", body: JSON.stringify({ pipelineId: PIPELINE_ID, pipelineStageId: NEW_LEAD_STAGE_ID, locationId: LOCATION_ID, contactId, name: `${name} — Free SEO Audit`, status: "open", source: pageUrl || "workwithcolby.com SEO services" }) }, token);
    return response(200, { ok: true });
  } catch (error) {
    console.error("SEO audit lead capture failed", { message: error.message, statusCode: error.statusCode });
    return response(502, { error: "We could not save your audit request. Please try again." });
  }
};
