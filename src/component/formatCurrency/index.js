const FormatIdr = (e) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(e);
};

export default FormatIdr;
