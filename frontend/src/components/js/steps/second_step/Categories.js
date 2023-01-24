import React, { useContext, useEffect } from "react";
import { ConfigContext } from "../../../../ConfigContext";
import "../../../css/steps/second_step/Categories.css";

export default function Categories() {
  const { config, setConfig } = useContext(ConfigContext);

  let defaultCategories = [
    ["NUMER PESEL", "pesel number"],
    ["NUMER DOWODU OSOBISTEGO", "id number"],
    ["NUMER KARTY KREDYTOWEJ", "credit card number"],
    ["NUMER NIP", "nip number"],
    ["NUMER TELEFONU", "phone number"],
    ["NUMER RACHUNKU BANKOWEGO", "bank account number"],
    ["EMAIL ADDRESS", "e-mail"],
    ["HOME ADDRESS", "home address"],
  ];

  let categories = [
    ["PASSWORDS", "passwords"],
    ["PHONE NO.", "PHONE NO."],
    ["DATA URODZENIA", "date of birth"],
    ["IMIĘ/NAZWISKO", "name/surname"],
    ["DATA WAŻNOŚCI", "EXPIRATION DATE"],
    ["DATE", "date"],
    ["POLISH SENSITIVE", "polish characters"],
    ["U.S.SOCIAL SECURITY NO", "U.S.SOCIAL SECURITY NO."],
    ["IPV4 ADDRESS", "IPV4 ADDRESS"],
    ["MASTERCARD NUMBER", "MASTERCARD NUMBER"],
    ["VISA CARD NUMBER", "VISA CARD NUMBER"],
    ["AMERICAN EXPRESS CARD NUMBER", "AMERICAN EXPRESS CARD NUMBER"],
    ["U.S. ZIP CODE", "U.S. ZIP CODE"],
    ["FILE PATH", "FILE PATH"],
    ["DOLLAR AMOUNT", "DOLLAR AMOUNT"],
    ["HEALTH INSURANCE NO.", "HEALTH INSURANCE NO."],
    ["CELL PHONE NO.", "CELL PHONE NUMBER"],
    ["PASSPORT NUMBER", "PASSPORT NUMBER"],
    ["DRIVER'S LICENSE NUMBER", "DRIVER'S LICENSE NUMBER"],
    ["NATIONAL IDENTIFICATION NUMBER", "NATIONAL IDENTIFICATION NUMBER"],
    ["NATIONAL INSURANCE NUMBER", "NATIONAL INSURANCE NUMBER"],
    ["NATIONAL HEALTH SERVICE NUMBER", "NATIONAL HEALTH SERVICE NUMBER"],
    ["CREDIT CARD SECURITY CODE(CVV)", "CREDIT CARD SECURITY CODE(CVV)"],
    ["AGE", "age"],
    ["EMERGENCY CONTACT", "EMERGENCY CONTACT"],
    ["DIFFERENT - MIGHT DELETE", "DIFFERENT - MIGHT DELETE"],
    ["INCOME", "INCOME"],
    ["BLOOD TYPE", "BLOOD TYPE"],
    ["INVOICE NUMBERS", "INVOICE NUMBERS"],
    ["TRANSACTION AMOUNTS", "TRANSACTION AMOUNTS"],
    [
      "PERSONAL IDENTIFICATION NUMBERS (PINS)",
      "PERSONAL IDENTIFICATION NUMBERS (PINS)",
    ],
    ["NUMER FAKTURY/POLISY/ZAMOWIENIA", "INVOICE/POLICY/ORDER NUMBER"],
    ["KWOTA", "amount"],
    ["NUMER REGON", "REGON NUMBER"],
    ["ADRES FIRMY", "COMPANY ADDRESS"],
    ["NUMER PARTII/SERII", "LOT/SERIES NUMBER"],
  ];

  const handleConfig = (event) => {
    const category = event.target.value;
    setConfig((prevConfig) => {
      const regex_categories = prevConfig.regex_categories.includes(category)
        ? prevConfig.regex_categories.filter((c) => c !== category)
        : [...new Set([...prevConfig.regex_categories, category])];
      return {
        ...prevConfig,
        regex_categories,
      };
    });
  };

  const handleFaces = (event) => {
    setConfig((prevConfig) => {
      return {
        ...prevConfig,
        hide_people: event.target.checked,
      };
    });
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category[1].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDefaultCategories = defaultCategories.filter((category) =>
    category[1].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories justify-content-center">
      <div className="categories__title">Select category to anonymize:</div>
      <div className="categories__background">
        <div className="categories__form">
          <input
            type="search"
            placeholder="Search..."
            className="categories__search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          style={{ overflowY: "scroll", height: "200px" }}
          className="categories__scrollbar"
        >
          <div className="categories__item" key="human faces">
            <div className="categories__category">human faces</div>
            <input
              className="categories__checkbox"
              type="checkbox"
              value="human faces"
              id="human faces"
              onChange={handleFaces}
              checked={config.hide_people}
            />
          </div>

          {filteredDefaultCategories.map((category) => (
            <div className="categories__item" key={category[0]}>
              <div className="categories__category">
                {category[1].toLowerCase()}
              </div>
              <input
                className="categories__checkbox"
                type="checkbox"
                value={category[0]}
                id={category[0]}
                onChange={handleConfig}
                checked={config.regex_categories.includes(category[0])}
              />
            </div>
          ))}

          {filteredCategories.map((category) => (
            <div className="categories__item" key={category[0]}>
              <div className="categories__category">
                {category[1].toLowerCase()}
              </div>
              <input
                className="categories__checkbox"
                type="checkbox"
                value={category[0]}
                id={category[0]}
                onChange={handleConfig}
                checked={config.regex_categories.includes(category[0])}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
