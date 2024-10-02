"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Villas({ params }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameVilla, setNameVilla] = useState([]);
  const [loadingVilla, setLoadingVilla] = useState(true);
  const [errorVilla, setErrorVilla] = useState(null);
  const [modal, setModal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [page, setPage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://thebaliagent.com/api/test-data/${params.slug}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if (typeof window !== "undefined") {
      if (localStorage.getItem("data") === params.slug) {
      } else {
        router.push("/");
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://thebaliagent.com/api/data-villa");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setNameVilla(json);
      } catch (err) {
        setErrorVilla(err.message);
      } finally {
        setLoadingVilla(false);
      }
    };

    fetchData();
  }, []);

  const sweeterArray = nameVilla
    .filter((data) => data.beds24_property_id == params.slug)
    .map((data) => data);

  const replaceLineBreaksWithBR = (text) => {
    return text.split("\r\n\r\n").map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data.length === 0) {
    return (
      <h1 className="p-2 text-lg font-bold mb-4">
        0 Guest in {sweeterArray[0].property_name}{" "}
      </h1>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const changeModal = (number) => {
    setShowModal(true);
    setModal(number);
  };

  const countryCodes = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cabo Verde",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, Democratic Republic of the",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    SZ: "Eswatini",
    ET: "Ethiopia",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and McDonald Islands",
    VA: "Holy See",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea, Democratic People's Republic of",
    KR: "Korea, Republic of",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestine, State of",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    BL: "Saint Barthélemy",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin (French part)",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten (Dutch part)",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States of America",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands (British)",
    VI: "Virgin Islands (U.S.)",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    NULL: "-",
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("data");
    router.push("/");
  };

  return (
    <main className="p-2">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              x
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
      <button
        type="button"
        class="focus:outline-none text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={handleLogout}
      >
        Logout
      </button>
      <h1 className="p-2 text-lg font-bold mb-4">
        List Guest {sweeterArray[0].property_name}
      </h1>
      <div className="md:flex flex-col hidden">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-bold uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold uppercase">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold uppercase">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-end text-xs font-bold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((dt, index) => (
                    <tr key={dt.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {dt.firstName} {dt.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatDate(dt.arrival)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatDate(dt.departure)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                        {dt.status === "confirmed" && (
                          <div className="text-blue-600 text-center font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "black" && (
                          <div className="text-center font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "request" && (
                          <div className="text-[#ff7400] text-center font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "new" && (
                          <div className="text-[#ff7400] text-center font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "inquiry" && (
                          <div className="text-[#ff7400] text-center font-bold">
                            {dt.status}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          className="bg-[#279384] text-white font-bold py-2 px-4 rounded"
                          onClick={() => changeModal(dt.id)}
                        >
                          More Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {data.map((dt, index) => (
        <div
          className="flex flex-col md:hidden border-2 mt-3 shadow-lg rounded-lg"
          key={dt.id}
        >
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="inline-block">
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        No
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        Name
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        Check In
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        Check Out
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        Status
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="1" className="px-6 py-4 text-start">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 inline-block">
                    <tr>
                      <td className="px-6 py-4">{index + 1}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        {" "}
                        {dt.firstName} {dt.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">{formatDate(dt.arrival)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">{formatDate(dt.departure)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 capitalize">
                        {dt.status === "confirmed" && (
                          <div className="text-blue-600 text-start font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "black" && (
                          <div className="text-start font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "request" && (
                          <div className="text-[#ff7400] text-start font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "new" && (
                          <div className="text-[#ff7400] text-start font-bold">
                            {dt.status}
                          </div>
                        )}
                        {dt.status === "inquiry" && (
                          <div className="text-[#ff7400] text-start font-bold">
                            {dt.status}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <button
                          className="bg-[#279384] text-white font-bold py-2 px-4 rounded"
                          onClick={() => changeModal(dt.id)}
                        >
                          More Info
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ))}

      {showModal && modal !== null && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow ">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h2 className="font-bold text-xl">Detail Guest</h2>
                  <button
                    type="button"
                    className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="default-modal"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  {data.find((d) => d.id === modal) && (
                    <div>
                      <p className="font-bold">Name Guest</p>
                      <p>
                        {data.find((d) => d.id === modal).firstName}{" "}
                        {data.find((d) => d.id === modal).lastName}
                      </p>
                      <hr></hr>
                      <p className="font-bold mt-5">Number Guest</p>
                      <p>Adult : {data.find((d) => d.id === modal).adult}</p>
                      <p>Child : {data.find((d) => d.id === modal).child}</p>
                      <hr></hr>
                      <p className="font-bold mt-5">Arrival Time</p>
                      <p>
                        {data.find((d) => d.id === modal).arrivalTime
                          ? data.find((d) => d.id === modal).arrivalTime
                          : "-"}
                      </p>
                      <hr></hr>

                      {/* <p className="font-bold mt-5">Comments</p>
                      <p>
                        {data.find((d) => d.id === modal).comments
                          ? data.find((d) => d.id === modal).comments
                          : "-"}
                      </p>
                      <hr></hr> */}
                      <p className="font-bold mt-5">Country</p>
                      <p>
                        {data.find((d) => d.id === modal).country2
                          ? countryCodes[
                              data
                                .find((d) => d.id === modal)
                                .country2.toUpperCase()
                            ]
                          : "-"}
                      </p>
                      <hr></hr>
                      <p className="font-bold mt-5">Notes</p>
                      <p>
                        {data.find((d) => d.id === modal).notes
                          ? replaceLineBreaksWithBR(
                              data.find((d) => d.id === modal).notes
                            )
                          : "-"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </main>
  );
}
