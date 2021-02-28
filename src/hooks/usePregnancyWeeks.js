import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { useSelectedLanguage } from "../context/language";
import WeeklyInformationService from "../services/WeeklyInformationService";

export const usePregnancyWeeks = () => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    if (selectedLanguage) {
      WeeklyInformationService.getWeeks(selectedLanguage)
        .then(weeks => {
          setWeeks(weeks);
          console.log("Loaded pregnancy weeks");
        })
        .catch(err => {
          console.log("Error loading weeks");
        });
    }
  }, [selectedLanguage]);

  const selectWeek = weekId => {
    history.push(`/weeks/${weekId}`);
  };

  return {
    weeks,
    selectWeek
  };
};

export const usePregnancyWeek = weekId => {
  const { selectedLanguage } = useSelectedLanguage();

  const [selectedContext, setSelectedContext] = useState("child");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [documentRef, setDocumentRef] = useState(null);

  useEffect(() => {
    const ref = WeeklyInformationService.getWeeklyInformationRef(
      selectedLanguage,
      weekId
    );

    WeeklyInformationService.getWeeklyInformation(ref)
      .then(data => {
        setDocumentRef(ref);
        setSelectedWeek(data);
        console.log("Loaded week", data);
      })
      .catch(err => {
        console.log("Error loading week", weekId);
      });
  }, [selectedLanguage, weekId, selectedContext]);

  return {
    documentRef,
    selectedContext,
    setSelectedContext,
    selectedWeek,
    setSelectedWeek
  };
};
