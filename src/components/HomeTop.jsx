import React, { useState } from "react";
import { useFlight } from "../Contexts/Flights";
import { useHistory } from "react-router-dom";
import "flag-icon-css/css/flag-icon.min.css";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
function HomeTop(props) {
  const {
    currentUser,
    flightSearch,
    find,
    setFind,
    suggestions,
    setSuggestions,
    finder,
  } = useFlight();
  const history = useHistory();
  const [details, setDetails] = useState({
    Origin: "",
    Destination: "",
    type: "",
    departDate: "",
    returnDate: undefined,
    class: "",
    traveller: {
      adult: 0,
      child: 0,
      infant: 0,
    },
    Airport: {
      Origin: "",
      Destination: "",
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await await flightSearch(details);

      history.push("/flightlist");
    } catch {}
  }

  function onChangeHandler(e) {
    setFind("");
    var name = e.target.name;
    var text = e.target.value;
    setFind(text);
    setDetails({ ...details, [name]: text });
    if (text.length > 2) {
      finder();
    }
  }

  function onSuggestHandler(e) {
    var name = e.currentTarget.name;
    var text = e.currentTarget.value;
    let tag = e.currentTarget.dataset.tag;
    console.log(text);
    setDetails({
      ...details,
      [name]: text,
      Airport: { ...details.Airport, [name]: tag },
    });

    setSuggestions([]);
  }

  return (
    <div className="component-home-top">
      <div className="jumbotron jumbotron-fluid">
        <h1 className="display-4 text-light text-center mt-5">Airway Moment</h1>
        <p className="lead text-light text-center mb-3 mt-3">
          Plan Your Trip With Us
        </p>
        <form onSubmit={handleSubmit} className="flight-form">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="form-group origin ">
                  <label className="text-light" htmlFor="origin-airport">
                    Origin:
                  </label>
                  <input
                    value={details.Origin}
                    type="text"
                    autoComplete="off"
                    name="Origin"
                    onChange={onChangeHandler}
                    className="form-control"
                    id="origin-airport"
                    placeholder="Enter Origin"
                  />

                  <ul id="results" className="list-group ">
                    {find === details.Destination
                      ? null
                      : suggestions.map((suggestion, i) => (
                          <button
                            type="submit"
                            name="Origin"
                            key={i}
                            data-tag={suggestion.name}
                            className="list-group-item list-group-item-action search-bar-dropdown newc "
                            value={suggestion.address.cityCode}
                            onClick={onSuggestHandler}
                          >
                            <b>
                              {suggestion.address.cityName},
                              {suggestion.address.countryName} (
                              {suggestion.address.cityCode})
                            </b>
                            &emsp;
                            <span
                              className={`flag-icon flag-icon-${suggestion.address.countryCode.toLowerCase()}`}
                            ></span>
                            <p>{suggestion.name}</p>
                          </button>
                        ))}
                  </ul>
                </div>
              </div>

              <div className="col-sm">
                <div className="form-group destination ">
                  <label className="text-light" htmlFor="destination-airport">
                    Destination:
                  </label>
                  <input
                    value={details.Destination}
                    type="text"
                    className="form-control "
                    name="Destination"
                    onChange={onChangeHandler}
                    id="destination-airport"
                    placeholder="Enter Destination"
                  />
                  <ul id="results" className="list-group ">
                    {find === details.Origin
                      ? null
                      : suggestions.map((suggestion, i) => (
                          <button
                            type="submit"
                            name="Destination"
                            key={i}
                            data-tag={suggestion.name}
                            className="list-group-item list-group-item-action "
                            value={suggestion.address.cityCode}
                            onClick={onSuggestHandler}
                          >
                            <b>
                              {suggestion.address.cityName},
                              {suggestion.address.countryName} (
                              {suggestion.address.cityCode})
                            </b>
                            &emsp;
                            <span
                              className={`flag-icon flag-icon-${suggestion.address.countryCode.toLowerCase()}`}
                            ></span>
                            <p>{suggestion.name}</p>
                          </button>
                        ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="form-group type">
              <label className="text-light" htmlFor="type">
                Type:
              </label>
              <select
                value={details.type}
                type="text"
                className="form-control"
                onChange={(e) =>
                  setDetails({ ...details, type: e.target.value })
                }
                id="type"
              >
                <option disabled value="">
                  Roundtrip or One Way
                </option>
                <option value="roundtrip">Roundtrip</option>
                <option value="oneway">One Way</option>
              </select>
            </div>

            <div className="row">
              <div className="col-sm col-12-md">
                <div className="form-group departing-date">
                  <label className="text-light" htmlFor="departing-date">
                    Departing:
                  </label>
                  <input
                    value={details.departDate}
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      setDetails({ ...details, departDate: e.target.value })
                    }
                    id="departing-date"
                  />
                </div>
              </div>
              {details.type === "oneway" ? null : (
                <div className="col-sm col-0-md">
                  <div className={`form-group returning-date`}>
                    <label className="text-light" htmlFor="returning-date">
                      Returning:
                    </label>
                    <input
                      value={details.returnDate}
                      type="date"
                      className="form-control"
                      onChange={(e) =>
                        setDetails({ ...details, returnDate: e.target.value })
                      }
                      id="departing-date"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-sm col-12-md">
                <div className="form-group ">
                  <label className="text-light">Travellers</label>
                  <div className="dropdown-contain">
                    <DropdownButton
                      id="dropdown-basic-button "
                      title="Select No. Of Travellers "
                      variant="light"
                      autoClose="outside"
                      className="position-relative"
                    >
                      <Dropdown.Item>
                        {" "}
                        <label className="text-dark">Adults</label>
                        <input
                          type="number"
                          className="form-control col-sm col-12-md"
                          value={details.traveller.adult}
                          placeholder="Enter No."
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              traveller: {
                                ...details.traveller,
                                adult: e.target.value,
                              },
                            })
                          }
                        ></input>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <label className="text-dark" htmlFor="departing-date">
                          Childrens
                        </label>
                        <input
                          type="number"
                          className="form-control col-sm col-12-md"
                          id="input1"
                          value={details.traveller.child}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              traveller: {
                                ...details.traveller,
                                child: e.target.value,
                              },
                            })
                          }
                          placeholder="Enter No."
                        ></input>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <label className="text-dark" htmlFor="departing-date">
                          Infants
                        </label>
                        <input
                          type="number"
                          className="form-control col-sm col-12-md"
                          value={details.traveller.infant}
                          id="input1"
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              traveller: {
                                ...details.traveller,
                                infant: e.target.value,
                              },
                            })
                          }
                          placeholder="Enter No."
                        ></input>
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="form-group destination ">
                  <label className="text-light" htmlFor="destination-airport">
                    Travel Class
                  </label>

                  <Form.Select
                    value={details.class}
                    aria-label="Default select example"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        class: e.target.value,
                      })
                    }
                  >
                    <option disabled value="">
                      Select Class
                    </option>
                    <option value="ECONOMY">ECONOMY</option>
                    <option value="PREMIUM_ECONOMY">PREMIUM ECONOMY</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="FIRST">FIRST</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="form-group submit">
              <button
                style={{ backgroundColor: "#FFA900" }}
                type="submit"
                className="btn col-12 btn-block mt-5"
              >
                Find Flights!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeTop;
