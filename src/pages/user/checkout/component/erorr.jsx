function CheckError(
  selectedProvince,
  selectedCity,
  selectedDistrict,
  selectedUrbanVillage,
  detailAddress,
  postalCode
) {
  const error = {};
  if (selectedProvince == "Select Province") {
    error.province = "Fill in the province";
  }
  if (selectedCity == "Select City") {
    error.city = "Fill in the city";
  }
  if (selectedDistrict == "Select District") {
    error.district = "Fill in the district";
  }
  if (selectedUrbanVillage == "Select Urban Village") {
    error.urbanVillage = "Fill in the Urban Village";
  }
  if (!detailAddress) {
    error.detailAddress = "Fill in the detail address";
  }
  if (!postalCode || postalCode == 0) {
    error.postalCode = "Fill in the postal code";
  }
  return error;
}

export default CheckError;
