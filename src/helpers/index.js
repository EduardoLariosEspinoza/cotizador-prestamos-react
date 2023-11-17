const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(valor);
};

const calcularTotalPagar = (cantidad, plazo) => {
  let total;

  if (cantidad < 5000) {
    total = cantidad * 1.5;
  } else if (cantidad >= 5000 && cantidad < 10000) {
    total = cantidad * 1.4;
  } else if (cantidad >= 10000 && cantidad < 15000) {
    total = cantidad * 1.3;
  } else {
    total = cantidad * 1.2;
  }

  switch (plazo) {
    case 6:
      total *= 1.1;
      break;
    case 12:
      total *= 1.2;
      break;
    case 24:
      total *= 1.4;
      break;
    default:
      break;
  }

  return total;
};

export { formatearDinero, calcularTotalPagar };
