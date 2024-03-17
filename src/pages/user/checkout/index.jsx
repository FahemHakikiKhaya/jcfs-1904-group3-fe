import React, { useEffect, useState } from "react";
import axios from "axios";
import warehouseAxios from "../../../utils/axios";
import { Badge } from "react-bootstrap";
import {
  Button,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import CheckoutModal from "./modal";
import CheckError from "./component/erorr";
import "./style.css";

import { useSelector } from "react-redux";

function Checkout() {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  // Note :
  // Unshift digunakan untuk membuat value default pada select (ex : "Select Province")
  // Pengisiian address bertahap (ex : "akan muncul select city jika sudah terselect value pada tahap sebelumnya yaitu select province")
  // Penghitungan total dari carts dilakukan disini bukan di backend

  const [modalShowCheckout, setModalShowCheckout] = useState(false);
  const [carts, setCarts] = useState([]);
  const [totalToPay, setTotalToPay] = useState(0);
  const [errors, setErrors] = useState({});
  const [detailAddress, setDetailAddress] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [fetchedProvince, setFetchedProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("Select Province");

  const [fetchedCity, setFetchedCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select City");

  const [fetchedDistrict, setFetchedDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("Select District");

  const [fetchedUrbanVillage, setFetchedUrbanVillage] = useState([]);
  const [selectedUrbanVillage, setSelectedUrbanVillage] = useState(
    "Select Urban Village"
  );

  const indonesiaApi = "https://dev.farizdotid.com/api/daerahindonesia";

  const fetchProvinces = async () => {
    try {
      const res = await axios.get(`${indonesiaApi}/provinsi`);
      var province = res.data.provinsi;
      province.unshift({ nama: "Select Province" });

      setFetchedProvince(province);
    } catch (error) {
      throw error;
    }
  };
  const mapSelectIndonesiaApi = (one, two, three, four, five) => {
    // one = label
    // two = onChange Value
    // three = value
    // four = mapIndonesiaApi Params
    return (
      <>
        <InputLabel>{one}</InputLabel>
        <Select
          label={one}
          className="select-address"
          onChange={two}
          value={three}
        >
          {mapAddressMenuItem(four)}
        </Select>
        <div style={{ color: "red" }}>{five}</div>
      </>
    );
  };
  const fetchUrbanVillage = async () => {
    try {
      var selectedDistrictId = 0;
      fetchedDistrict.filter((value) => {
        if (value.nama == selectedDistrict) {
          selectedDistrictId = value.id;
        }
      });
      const res = await axios.get(`${indonesiaApi}/kelurahan`, {
        params: {
          id_kecamatan: selectedDistrictId,
        },
      });
      var UrbanVillage = res.data.kelurahan;
      UrbanVillage.unshift({ nama: "Select Urban Village" });

      setFetchedUrbanVillage(UrbanVillage);
    } catch (error) {
      throw error;
    }
  };
  const fetchDistrict = async () => {
    try {
      var selectedCityId = 0;
      fetchedCity.filter((value) => {
        if (value.nama == selectedCity) {
          selectedCityId = value.id;
        }
      });
      const res = await axios.get(`${indonesiaApi}/kecamatan`, {
        params: {
          id_kota: selectedCityId,
        },
      });
      var district = res.data.kecamatan;
      district.unshift({ nama: "Select District" });

      setFetchedDistrict(district);
    } catch (error) {
      throw error;
    }
  };
  const fetchCity = async () => {
    try {
      var selectedProvinceId = 0;
      fetchedProvince.filter((value) => {
        if (value.nama == selectedProvince) {
          selectedProvinceId = value.id;
        }
      });
      const res = await axios.get(`${indonesiaApi}/kota`, {
        params: {
          id_provinsi: selectedProvinceId,
        },
      });
      var city = res.data.kota_kabupaten;
      city.unshift({ nama: "Select City" });

      setFetchedCity(city);
    } catch (error) {
      throw error;
    }
  };

  const fetchCarts = async () => {
    try {
      const res = await warehouseAxios.get("/carts", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      });
      const { result } = res.data;
      if (result) {
        const res = await warehouseAxios.get("/products/cart", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: {
            result,
          },
        });
        const { carts } = res.data;
        countTotalToPay(carts);
        setCarts(carts);
      }
    } catch (error) {
      throw error;
    }
  };

  const countTotalToPay = (e) => {
    var allCartsAmount = 0;
    e.map((value) => {
      allCartsAmount += value.total;
    });
    setTotalToPay(allCartsAmount);
  };

  const mapCarts = () => {
    return carts.map((value) => {
      return (
        <div className="order-summary-item">
          <img className="item-image" src={value.image} />
          <div className="item-desc">
            <p>Product Name : {value.productName}</p>
            <p>Variant : {value.variant}</p>
            <p>qty : {value.productQuantity}</p>
            <p>size : {value.size}</p>
          </div>
          <div className="item-total">
            <p>
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(value.total)}
            </p>
          </div>
        </div>
      );
    });
  };
  const mapAddressMenuItem = (e) => {
    return e.map((value) => {
      return <MenuItem value={value.nama}>{value.nama}</MenuItem>;
    });
  };
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };
  const handleUrbanVillageChange = (e) => {
    setSelectedUrbanVillage(e.target.value);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const onCheckoutButton = () => {
    const result = CheckError(
      selectedProvince,
      selectedCity,
      selectedDistrict,
      selectedUrbanVillage,
      detailAddress,
      postalCode
    );
    setErrors(result);
    if (Object.keys(result).length === 0) {
      setModalShowCheckout(true);
    }
  };

  useEffect(() => {
    fetchCarts();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince != "Select Province") {
      fetchCity();
    }
    setSelectedCity("Select City");
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity != "Select City") {
      fetchDistrict();
    }
    setSelectedDistrict("Select District");
  }, [selectedCity]);
  useEffect(() => {
    if (selectedDistrict != "Select District") {
      fetchUrbanVillage();
    }
    setSelectedUrbanVillage("Select Urban Village");
  }, [selectedDistrict]);

  return (
    <div className="checkout-container">
      <h1 className="header-custom">Checkout Your Items</h1>
      <div className="checkout-form-container">
        <div className="checkout-form">
          <h4 className="checkout-form-address-header">Fill In The Address</h4>

          <div className="checkout-form-address-body">
            {mapSelectIndonesiaApi(
              "Province",
              handleProvinceChange,
              selectedProvince,
              fetchedProvince,
              errors.province
            )}

            {selectedProvince != "Select Province"
              ? mapSelectIndonesiaApi(
                  "City",
                  handleCityChange,
                  selectedCity,
                  fetchedCity,
                  errors.city
                )
              : null}
            {selectedCity != "Select City"
              ? mapSelectIndonesiaApi(
                  "District",
                  handleDistrictChange,
                  selectedDistrict,
                  fetchedDistrict,
                  errors.district
                )
              : null}
            {selectedDistrict != "Select District"
              ? mapSelectIndonesiaApi(
                  "Urban Village",
                  handleUrbanVillageChange,
                  selectedUrbanVillage,
                  fetchedUrbanVillage,
                  errors.urbanVillage
                )
              : null}
            {selectedUrbanVillage != "Select Urban Village" ? (
              <>
                <InputLabel>Specify Your Addres</InputLabel>
                <input
                  value={detailAddress}
                  onChange={handleDetailAddressChange}
                  style={{ marginTop: "10px", width: "100%", height: "50px" }}
                />
                {errors.detailAddress && (
                  <div style={{ color: "red" }}>{errors.detailAddress}</div>
                )}
                <InputLabel>Postal Code</InputLabel>
                <input
                  type="number"
                  max="5"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  style={{ marginTop: "10px", width: "100%", height: "50px" }}
                />
                {errors.postalCode && (
                  <div style={{ color: "red" }}>{errors.postalCode}</div>
                )}
              </>
            ) : null}
          </div>

          <h6 className="delivery-option">Delivery Option</h6>

          <div className="checkout-form-delivery">
            <div className="checkout-form-delivery-option">
              <Checkbox
                defaultChecked
                disabled
                inputProps={{ "aria-label": "controlled" }}
              />
              <div>
                <h6>Free Delivery</h6>
                <p>Monday to Saturday, 7am - 7pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-container">
          <div className="order-summary-form">
            <h6>Order Summary</h6>
            {carts.length && mapCarts()}
            <div className="item-subtotal">
              <h6>Subtotal</h6>
              <h6>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalToPay)}
              </h6>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
            }}
            onClick={onCheckoutButton}
          >
            Checkout
          </Button>
          <CheckoutModal
            show={modalShowCheckout}
            onHide={() => {
              setModalShowCheckout(false);
            }}
            carts={carts}
            totalToPay={totalToPay}
            selectedProvince={selectedProvince}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            selectedUrbanVillage={selectedUrbanVillage}
            detailAddress={detailAddress}
            postalCode={postalCode}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
