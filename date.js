function getDate() {
  let today = new Date(),
    options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

  return today.toLocaleDateString("en-Us", options);
}

module.exports = getDate;