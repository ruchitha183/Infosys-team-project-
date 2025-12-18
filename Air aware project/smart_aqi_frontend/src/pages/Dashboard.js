// import { useEffect, useState, useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// import AQICard from "../components/AQICard";
// import PollutantChart from "../components/PollutantChart";
// import PredictionChart from "../components/PredictionChart";
// import HealthCard from "../components/HealthCard";
// import Header from "../components/Header";
// import AQILegend from "../components/AQILegend";

// import { Listbox } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
// import { fetchCurrentAQI, fetchPredictionAQI } from "../utils/api";

// // const locations = [
// //   "Abids","Sultan Bazar","Nampally","Koti","Ameerpet","Begumpet","Panjagutta",
// //   "Banjara Hills","Jubilee Hills","Somajiguda","Kukatpally","Miyapur","Hafeezpet",
// //   "Madhapur","Gachibowli","Kondapur","LB Nagar","Dilsukhnagar","Malakpet",
// //   "Attapur","Uppal","Nacharam","ECIL","Malkajgiri","Secunderabad"
// // ];

// const locations = [
//   "Visakhapatnam",
//   "Vijayawada",
//   "Guntur",
//   "Nellore",
//   "Kurnool",
//   "Rajahmundry",
//   "Kakinada",
//   "Tirupati",
//   "Chittoor",
//   "Anantapur",
//   "Kadapa",
//   "Eluru",
//   "Machilipatnam",
//   "Ongole",
//   "Vizianagaram",
//   "Srikakulam",
//   "Tenali",
//   "Nandyal",
//   "Proddatur",
//   "Bhimavaram"
// ];


// const Dashboard = () => {
//   const { theme } = useContext(ThemeContext);

//   const [location, setLocation] = useState(locations[0]);
//   const [aqiData, setAqiData] = useState({});
//   const [prediction, setPrediction] = useState({});
//   const [alert, setAlert] = useState("");
//   const [showAlert, setShowAlert] = useState(false);

//   const loadAQIData = async () => {
//     try {
//       const data = await fetchCurrentAQI(location);
//       setAqiData(data);

//       // Set alert based on AQI
//       if (data?.aqi > 150)
//         setAlert("⚠️ Air quality is unhealthy! Take precautions.");
//       else if (data?.aqi > 100)
//         setAlert("⚠️ Air quality is moderate. Sensitive people should be careful.");
//       else
//         setAlert("✅ Air quality is good.");

//       // Fetch short-term AQI predictions
//       const predictionData = await fetchPredictionAQI(location, "1year");
//       setPrediction(predictionData?.shortTerm || {});

//       setShowAlert(true);
//     } catch (error) {
//       console.error("Error fetching AQI data:", error);
//     }
//   };

//   useEffect(() => {
//     loadAQIData();
//     const interval = setInterval(loadAQIData, 60000); // refresh every 1 min
//     return () => clearInterval(interval);
//   }, [location]);

//   // Auto-hide alert
//   useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => setShowAlert(false), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [showAlert]);

//   return (
//     <div
//       id="dashboard"
//       className={`min-h-screen p-6 transition-colors duration-300
//         ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
//     >
//       {/* Header */}
//       <Header title="Andhra Pradesh AQI Dashboard" location={location} aqi={aqiData?.aqi} />
      
//       {/* Toast-style alert */}
//       <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
//         {alert && (
//           <div
//             className={`px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500
//               ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
//               ${showAlert ? "animate-fade-in" : "animate-fade-out"}`}
//           >
//             {alert}
//           </div>
//         )}
//       </div>

//       {/* Location Selector */}
//       <div className="mb-4 w-72">
//         <Listbox value={location} onChange={setLocation}>
//           <div className="relative mt-1">
//             <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm">
//               <span className="block truncate">{location}</span>
//               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
//               </span>
//             </Listbox.Button>

//             <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
//               {locations.map((loc, idx) => (
//                 <Listbox.Option
//                   key={idx}
//                   value={loc}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4
//                      ${active ? "bg-orange-100 dark:bg-orange-600" : "text-gray-900 dark:text-gray-200"}`
//                   }
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
//                         {loc}
//                       </span>
//                       {selected && (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600 dark:text-white">
//                           <CheckIcon className="h-5 w-5" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </div>
//         </Listbox>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
//         <AQICard data={aqiData} />
//         <HealthCard aqi={aqiData?.aqi} />
//       </div>

//       {/* AQI Legend */}
//       <AQILegend />

//       {/* Charts */}
//       <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <PollutantChart data={aqiData} />
//         <PredictionChart data={prediction} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import AQICard from "../components/AQICard";
import PollutantChart from "../components/PollutantChart";
import PredictionChart from "../components/PredictionChart";
import HealthCard from "../components/HealthCard";
import Header from "../components/Header";
import AQILegend from "../components/AQILegend";

import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { fetchCurrentAQI, fetchPredictionAQI } from "../utils/api";

/* ✅ ALL INDIA – MAJOR CITIES */
const locations = [
  // Metro Cities
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",

  // Andhra Pradesh
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Nellore",
  "Kurnool",
  "Rajahmundry",
  "Kakinada",
  "Tirupati",

  // Telangana
  "Warangal",
  "Nizamabad",
  "Karimnagar",

  // Tamil Nadu
  "Coimbatore",
  "Madurai",
  "Salem",

  // Karnataka
  "Mysuru",
  "Mangaluru",
  "Hubballi",

  // Maharashtra
  "Nagpur",
  "Nashik",
  "Aurangabad",

  // Kerala
  "Kochi",
  "Thiruvananthapuram",
  "Kozhikode",

  // Others
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Cuttack",
  "Guwahati",
  "Shillong",
];

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  const [location, setLocation] = useState(locations[0]);
  const [aqiData, setAqiData] = useState({});
  const [prediction, setPrediction] = useState({});
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const loadAQIData = async () => {
    try {
      const data = await fetchCurrentAQI(location);
      setAqiData(data);

      if (data?.aqi > 150)
        setAlert("⚠️ Air quality is unhealthy! Take precautions.");
      else if (data?.aqi > 100)
        setAlert("⚠️ Air quality is moderate. Sensitive people should be careful.");
      else
        setAlert("✅ Air quality is good.");

      const predictionData = await fetchPredictionAQI(location);
      setPrediction(predictionData || {});

      setShowAlert(true);
    } catch (error) {
      console.error("Error fetching AQI data:", error);
    }
  };

  useEffect(() => {
    loadAQIData();
    const interval = setInterval(loadAQIData, 60000);
    return () => clearInterval(interval);
  }, [location]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div
      id="dashboard"
      className={`min-h-screen p-6 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      {/* Header */}
      <Header
        title="India AQI Dashboard"
        location={location}
        aqi={aqiData?.aqi}
      />

      {/* Toast Alert */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
        {alert && (
          <div
            className={`px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500
              ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
              ${showAlert ? "animate-fade-in" : "animate-fade-out"}`}
          >
            {alert}
          </div>
        )}
      </div>

      {/* Location Dropdown (UNCHANGED UI) */}
      <div className="mb-4 w-80">
        <Listbox value={location} onChange={setLocation}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm">
              <span className="block truncate">{location}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-64 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {locations.map((loc, idx) => (
                <Listbox.Option
                  key={idx}
                  value={loc}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4
                    ${active ? "bg-orange-100 dark:bg-orange-600" : "text-gray-900 dark:text-gray-200"}`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {loc}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600 dark:text-white">
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <AQICard data={aqiData} />
        <HealthCard aqi={aqiData?.aqi} />
      </div>

      <AQILegend />

      {/* Charts */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <PollutantChart data={aqiData} />
        <PredictionChart data={prediction} />
      </div>
    </div>
  );
};

export default Dashboard;
