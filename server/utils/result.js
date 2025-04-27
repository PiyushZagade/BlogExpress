function createResult(err, data) {
  if (data) return createSuccessResult(data);
  return createErrorResult(err);
}
function createSuccessResult(data) {
  return { status: "success", data: data };
}
function createErrorResult(err) {
  return { status: "error", error: err };
}

module.exports = { createResult, createErrorResult, createSuccessResult };
