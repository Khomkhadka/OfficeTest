import React from 'react'
import { Pie } from "react-chartjs-2"
import "chart.js/auto"
import { useContext,useEffect } from 'react'
import { AuthContext } from "../context/storeContext.jsx";
// import { products } from '../assets/assets'

const PieChart = () => {
   const { products, fetchProducts} = useContext(AuthContext)
  const totalQuantity = products.reduce((sum, item) => sum + item.Quantity, 0)

 

  useEffect(()=>{
    fetchProducts()
  },[])

  const Pdata = {
     
    labels: products.map((data) => data.Product),
    datasets: [
      {
        label: 'Revenue',
        data: products.map((data) => data.Revenue),
        backgroundColor: [
          'rgba(255,99,132,0.5)',
          'rgba(54,162,235,0.5)',
          'rgba(255,206,86,0.5)',
          'rgba(75,192,192,0.5)',
          'rgba(153,102,255,0.5)',
        ],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      title: {
        display: true,
        text: "Product Revenue Distribution",
        font: {
          size: 18,
          weight: "bold"
        }
      }
    }
  }



  return (
    <div className="max-w-full min-w-auto mx-auto bg-white shadow-lg rounded-2xl p-6 mb-6">
      {/* Pie Chart */}
      <div className="w-full h-96 rounded-xl overflow-hidden">
        <Pie data={Pdata} options={options} />
      </div>

      {/* Explanation Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Pie Chart Explanation</h2>
        <p className="text-gray-700 text-justify leading-relaxed">
          A <strong>Pie Chart</strong> shows the proportion of each product's revenue relative to the total. 
          Each slice represents a product, and the size corresponds to the revenue it generated. 
          For our products:
          {products.map(p => (
            <span key={p.Product} className="block mt-2">
              {p["Product Name"]} ({p.Category}) sold {p["Quantity Sold"]} units, generating a revenue of Rs.{p.Revenue}, 
             
            </span>
          ))}
          This visualization helps to understand which products contributed the most to overall sales.
        </p>
      </div>
    </div>
  )
}

export default PieChart
