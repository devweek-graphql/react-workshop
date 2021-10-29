import React, { useState, useEffect } from "react";
import APP_CONFIG from "config/app.config";

export const SystemContext = React.createContext();

export default function SystemContextProvider({children}) {
  const [aRocketList, setRocketList] = useState([]);
  const [aLaunchList, setLaunchList] = useState([]);
  const [sSelectedRocketId, setSelectedRocketId] = useState("all");

  useEffect(() => {
    try {
      const GetRocketList = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}rockets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (oResponse.status === 200){
          let oData = await oResponse.text();
          setRocketList(JSON.parse(oData));
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetRocketList();

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const GetLaunchList = async () => {
        const oData = {
          options: {
            pagination: false
          }
        };
        if (sSelectedRocketId !== "all") {
          oData.query = {
            "rocket": sSelectedRocketId
          };
        }
        const oResponse = await fetch(`${APP_CONFIG.API_URL}launches/query`, {
          method: "POST",
          body: JSON.stringify(oData),
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (oResponse.status === 200){
          let oData =JSON.parse(await oResponse.text());
          setLaunchList(oData.docs);
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetLaunchList();

    } catch (error) {
      console.log(error);
    }
  }, [sSelectedRocketId]);

  return <SystemContext.Provider
    value={{
      aRocketList,
      setRocketList,
      sSelectedRocketId,
      setSelectedRocketId,
      aLaunchList,
      setLaunchList
    }}
  >
    {children}
  </SystemContext.Provider>
};