import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-primary text-white w-full">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-2xl font-bold mb-3 font-[Odor-Mean-Chey]">
            Holidaze
          </h4>
          <p>
            Holidaze is your go-to platform for discovering and booking unique
            accommodations.
          </p>
          <div className="flex mt-4">
            <a href="#!" className="mr-4 text-white">
              <FaFacebookF />
            </a>
            <a href="#!" className="mr-4 text-white">
              <FaInstagram />
            </a>
            <a href="#!" className=" mr-4 text-white">
              <FaTwitter />
            </a>
            <a href="#!" className="text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-l font-bold mb-3">SOLUTION</h4>
          <ul>
            <li className="mb-2">Marketing</li>
            <li className="mb-2">Analytics</li>
            <li>Commerce</li>
          </ul>
        </div>
        <div>
          <h4 className="text-l font-bold mb-3">SUPPORT</h4>
          <ul>
            <li className="mb-2">Pricing</li>
            <li className="mb-2">Documentation</li>
            <li>Guides</li>
          </ul>
        </div>
        <div>
          <h4 className="text-l font-bold mb-3">COMPANY</h4>
          <ul>
            <li className="mb-2">About</li>
            <li className="mb-2">Blog</li>
            <li>Jobs</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-600">
        <p>© Copyright 2021. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* 
<footer className="">
      <div>
        <div>
          <div>
            <h4>Holidaze</h4>
            <p>
              Holidaze is your go-to platform for discovering and booking unique
              accomodations
            </p>
            <div>
              <a href="">
                <FaFacebookF />
              </a>
              <a href="">
                <FaInstagram />
              </a>
              <a href="">
                <FaTwitter />
              </a>
              <a href="">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer> */
