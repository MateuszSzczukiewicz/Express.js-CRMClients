class ValidationError extends Error {}
class NotFoundError extends Error {}

function handleError(err, req, res) {
  if (err instanceof NotFoundError) {
    res.status(404).render("error", {
      message: "Nie można znaleźć elementu o danym ID.",
    });
    return;
  }
  res.status(err instanceof ValidationError ? 400 : 500);
  res.render("error", {
    message:
      err instanceof ValidationError
        ? err.message
        : "Przepraszamy spróbuj ponownie za jakiś czas.",
  });
}

module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};
