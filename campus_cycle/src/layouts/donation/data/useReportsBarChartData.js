// src/layouts/donation/data/useReportsBarChartData.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import LOCAL_ADDR from "../../../GLOBAL_ADDRESS";

const useReportsBarChartData = () => {
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Donations",
      data: new Array(12).fill(0) // Initialize with zeroes
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LOCAL_ADDR}donation-amounts/monthly`);
        const monthlyData = response.data;

        // Process API response to match chart data format
        const data = new Array(12).fill(0); // Initialize data array for 12 months
        monthlyData.forEach(item => {
          const [year, month] = item.month.split('-');
          const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
          data[monthIndex] = item.totalAmount;
        });

        setChartData(prevData => ({
          ...prevData,
          datasets: {
            ...prevData.datasets[0],
            data,
          }
        }));
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchData();
  }, []);

  return chartData;
};

export default useReportsBarChartData;
