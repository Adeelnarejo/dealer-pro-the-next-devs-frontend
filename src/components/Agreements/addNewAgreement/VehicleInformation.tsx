import React from "react";
import { useLocation } from "react-router-dom";

type Props = {
  form: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const VehicleInformation: React.FC<Props> = ({ form, handleChange }) => {
  const location = useLocation();

  return (
    <div className="bg-[#ffffff] rounded-lg p-4 mb-4">
      <h2 className="text-blue-900 font-semibold mb-4">
        Fordonsspecifikation
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* {(location.pathname === "/add-new-sales-agreement" ||
          location.pathname === "/add-new-purchase-agreement") && ( */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">momstyp</label>
          <select
            name="vatType"
            value={form.vatType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Välj momstyp</option>
            <option value="vbm">VBM</option>
            <option value="vat">MOMS</option>
          </select>
        </div>
        {/* )} */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Miltal (km)
          </label>
          <input
            type="text"
            name="mileage"
            value={form.mileage}
            onChange={handleChange}
            placeholder="Vehicle Mileage"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {(location.pathname === "/add-new-purchase-agreement" ||
          location.pathname === "/add-new-agency-agreement") && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Senaste tjänsten
            </label>
            <input
              type="date"
              name="latestServiceDate"
              value={form.latestServiceDate || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nycklar</label>
          <select
            name="numberOfKeys"
            value={form.numberOfKeys}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Välj antal nycklar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Däck</label>
          <select
            name="deck"
            value={form.deck}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">Välj däcktyp</option>
            <option value="summer_tires">Sommardäck</option>
            <option value="winter_tire">Vinterdäck</option>
            <option value="summer_and_winter_tire">
              Sommar- och vinterdäck
            </option>
          </select>
        </div>
        {location.pathname === "/add-new-sales-agreement" && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Försäkringsgivare
              </label>

              <select
                name="insurer"
                value={form.insurer}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Välj försäkringsbolag</option>
                <option value="ingen-försäkring">Ingen försäkring </option>
                <option value="ica-försäkring">ICA försäkring</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Typ av försäkring
              </label>
              <select
                name="insuranceType"
                value={form.insuranceType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Välj försäkringstyp</option>
                <option value="ingen-försäkring">Ingen försäkring</option>
                <option value="14-dagars-prova-på">14 dagars prova på</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Garantileverantör
              </label>
              <input
                type="text"
                name="warrantyProvider"
                value={form.warrantyProvider}
                onChange={handleChange}
                placeholder="Warranty provider"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Warranty Product
              </label>
              <input
                type="text"
                name="warrantyProduct"
                value={form.warrantyProduct}
                onChange={handleChange}
                placeholder="Warranty product"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Senaste tjänsten
              </label>
              <input
                type="date"
                name="latestServiceDate"
                value={form.latestServiceDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleInformation;
