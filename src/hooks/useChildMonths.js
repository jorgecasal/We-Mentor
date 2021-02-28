import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { useSelectedLanguage } from "../context/language";
import MonthlyInformationService from "../services/MonthlyInformationService";

export const useChildMonths = () => {
  const history = useHistory();
  const { selectedLanguage } = useSelectedLanguage();

  const [months, setMonths] = useState([]);

  useEffect(() => {
    if (selectedLanguage) {
      MonthlyInformationService.getMonths(selectedLanguage)
        .then(months => {
          setMonths(months);
          console.log("Loaded pregnancy months");
        })
        .catch(err => {
          console.log("Error loading months");
        });
    }
  }, [selectedLanguage]);

  const selectMonth = monthId => {
    history.push(`/months/${monthId}`);
  };

  return {
    months,
    selectMonth
  };
};

export const useChildMonth = monthId => {
  const { selectedLanguage } = useSelectedLanguage();

  const [selectedContext, setSelectedContext] = useState("parenting");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [documentRef, setDocumentRef] = useState(null);

  useEffect(() => {
    const ref = MonthlyInformationService.getMonthlyInformationRef(
      selectedLanguage,
      monthId
    );

    MonthlyInformationService.getMonthlyInformation(ref)
      .then(data => {
        setDocumentRef(ref);
        setSelectedMonth(data);
        console.log("Loaded month", data);
      })
      .catch(err => {
        console.log("Error loading month", monthId);
      });
  }, [selectedLanguage, monthId]);

  return {
    documentRef,
    selectedContext,
    setSelectedContext,
    selectedMonth,
    setSelectedMonth
  };
};
