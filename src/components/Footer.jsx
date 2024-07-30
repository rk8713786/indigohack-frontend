import React from "react";

function Footer(props) {
  return (
    <div className="component-footer border-top border-secondary">
      <div className="footer-header">
        <h3 className="text-center mt-2">
          This is a Airlines management System
        </h3>
      </div>

      <hr className="border-secondary ml-4 mr-4" />

      <div className="row">
        <div className="col text-center">
          <h4>Github Repositories</h4>
          <p>
            <a href="https://github.com/rk8713786/indigohack-frontend.git">
              Front End (Website Design)
            </a>
          </p>

          <p>
            <a href="test.amadeus.com">Back End (API)</a>
          </p>
        </div>

        <div className="col text-center">
          <h4>Case Study</h4>
        </div>
      </div>
    </div>
  );
}

export default Footer;

