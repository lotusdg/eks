async function validation(body) {
  try {
    console.log(body);
    const validBody = [];
    body.forEach((element, i) => {
      if (
        element.provider.length !== 36 ||
        typeof element.provider !== 'string'
      ) {
        throw new Error(`TypeError: provider id[${i}]`);
      }
      if (typeof element.value !== 'string') {
        throw new Error(`TypeError: provider value[${i}]`);
      }
      validBody.push(element);
    });
    return { validBody };
  } catch (err) {
    console.error(err);
    return { validationError: `Had not pass the validation. ${err.message}` };
  }
}

module.exports = { validation };
