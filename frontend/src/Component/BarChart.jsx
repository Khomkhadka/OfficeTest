import React from 'react'
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { products } from '../assets/assets'

const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      title: {
        display: true,
        text: "Product Sales Overview",
        font: {
          size: 18,
          weight: "bold"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  }

  const Bdata = {
    labels: products.map((d) => d.Product),
    datasets: [
      {
        label: "Quantity Sold",
        data: products.map((d) => d.Quantity),
        backgroundColor: [
          'rgba(255,99,132,0.5)',
          'rgba(54,162,235,0.5)',
          'rgba(255,206,86,0.5)',
          'rgba(75,192,192,0.5)',
          'rgba(153,102,255,0.5)',
        ],
        borderRadius: 10 // rounded edges on bars
      },
    ],
  }

  return (
    <div className="max-w-full min-w-auto  bg-white shadow-lg rounded-2xl p-6 mb-6">
      {/* Chart */}
      <div className="w-full h-96 rounded-xl overflow-hidden">
        <Bar data={Bdata} options={options} />
      </div>

      {/* Quantity Sold Below Chart */}
      <div className=" mt-6  grid-cols-1 md:grid-cols-3 gap-4 text-center hidden md:grid ">
        {products.map((p) => (
          <div
            key={p.Product}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold">{p.Product}</h3>
            <p className="text-gray-700">Quantity Sold: <span className="font-bold">{p.Quantity}</span></p>
            <p className="text-gray-500 text-sm">{p.Category}</p>
            <p className="text-gray-500 text-sm">Revenue: ₹{p.Revenue}</p>
            <p className="text-gray-500 text-sm">Sales Date: {p["Sales-Date"]}</p>
          </div>
        ))}
      </div>

      {/* Explanation Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2 text-center">Bar Chart Explanation</h2>
        <p className="text-gray-700 text-justify leading-relaxed">
          A <strong>Bar Chart</strong> is used to compare the quantities of different products visually. 
          In this chart, the X-axis represents the product names, and the Y-axis represents the number of units sold. 
          For our products:
          {products.map(p => (
            <span key={p.Product}>
              {" "}
              {p.Product} ({p.Category}) sold {p.Quantity} units on {p["Sales-Date"]}, generating a revenue of ₹{p.Revenue}.
            </span>
          ))}
          This allows the user to quickly see which product sold the most and compare their sales side by side.
        </p>
      </div>
    </div>
  )
}

export default BarChart
