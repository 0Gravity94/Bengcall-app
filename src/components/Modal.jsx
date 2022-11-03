import React, { useState } from "react";
import { CustomInput, CustomOption, CustomSelect } from "./CustomInput";
import { default as ReactSelect } from "react-select";
import Button from "./CustomButton";

function ModalBookingService() {
  const locationOptions = [
    { value: "home", label: "Home Service" },
    { value: "workshop", label: "Workshop Service" },
  ];
  const serviceOptions = [
    { value: "complete-service", label: "Complete Service" },
    { value: "gear-set", label: "Change Gear Set" },
    { value: "brake", label: "Change Brake" },
    { value: "tune-up", label: "Tune Up" },
  ];
  const vehicleOptions = [
    { value: "revo", label: "125cc - Revo" },
    { value: "supra", label: "125cc - Supra" },
    { value: "vario", label: "150cc - Vario" },
    { value: "beat", label: "150cc - Beat" },
  ];

  // const [state, setState] = useState(null);

  // const handleChange = (selected) => {
  //   setState({
  //     optionSelected: selected,
  //   });
  // };

  return (
    <div>
      <div id="modal-booking">
        <label htmlFor="my-modal" className="btn">
          open modal
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal w-full  overflow-auto">
          <div className="w-2/4 h-3/4 md:h-auto p-8 rounded-lg flex flex-col items-center justify-center gap-6 bg-white shadow-md  overflow-auto">
            <h3 className="font-extrabold text-2xl text-PrimaryBlue">
              Booking Service
            </h3>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-1/2 flex flex-col gap-1">
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Fullname</p>
                  <p className="text-xl font-bold text-PrimaryBlue">Handoko</p>
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Phone</p>
                  <CustomInput
                    id="input-id"
                    type={"tel"}
                    className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                    // value={phonenumber}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input phonenumber"
                  />
                  <p className="text-xs italic">
                    Minimum 10 characters with "0"
                  </p>
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Address</p>
                  <CustomInput
                    id="input-address"
                    type={"text"}
                    className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                    // value={address}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input address"
                  />
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Booking Date</p>
                  <CustomInput
                    id="input-date"
                    type={"date"}
                    className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input date"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-1">
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Service Location</p>
                  <ReactSelect
                    id="service-location"
                    options={locationOptions}
                    components={{
                      CustomSelect,
                    }}
                  />
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Vehicle Type</p>
                  <ReactSelect
                    id="vehicle-type"
                    options={vehicleOptions}
                    components={{
                      CustomSelect,
                    }}
                  />
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Service Type</p>
                  <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                  >
                    <ReactSelect
                      id="service-type"
                      options={serviceOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        CustomOption,
                      }}
                      // onChange={handleChange}
                      allowSelectAll={true}
                      // value={state.optionSelected}
                    />
                  </span>
                </div>
                <div className="p-1 h-20">
                  <p className="text-PrimaryBlue">Other Request</p>
                  <CustomInput
                    id="input-request"
                    type={"text"}
                    className="border border-Line rounded-md text-20 mx-auto p-1.5 w-full bg-transparent"
                    placeholder="Input request"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                id="button-submit"
                className="flex justify-center items-center border border-PrimaryRed rounded-lg font-semibold text-lg text-PrimaryRed m-auto px-5 py-2 max-w-xs hover:bg-PrimaryRed hover:text-white cursor-pointer"
                label="SUBMIT"
                // onClick={handleSubmit}
              />
              <label htmlFor="my-modal">
                <Button
                  id="button-submit"
                  className="flex justify-center items-center border border-PrimaryBlue rounded-lg font-semibold text-lg text-PrimaryBlue m-auto px-5 py-2 max-w-xs hover:bg-PrimaryBlue hover:text-white cursor-pointer"
                  label="CANCEL"
                  // onClick={handleSubmit}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBookingService;
