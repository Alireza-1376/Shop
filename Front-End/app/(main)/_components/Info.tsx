import Cart from "./Cart"
import Map from "./Map"

function Info() {
  return (
    <div className="mt-10 grid grid-cols-12 gap-4 mb-10">
      <div className="col-span-12 lg:col-span-9">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full">
            <h2 className="text-center text-lg text-amber-600 mb-4">سرویس دهی آنلاین</h2>
            <table className=" w-full">
              <thead className="border-b border-gray-300">
                <tr>
                  <td className="text-center"></td>
                  <td className="text-center">صبحانه</td>
                  <td className="text-center">ناهار</td>
                  <td className="text-center">شام</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">شنبه تا جمعه</td>
                  <td className="text-center">-</td>
                  <td className="text-center">از 10:45 تا 18:00</td>
                  <td className="text-center">از 18:01 تا 23:45</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <div>
              <h2 className="text-center text-lg text-amber-600 mb-4">آدرس رستوران</h2>
              <p className="text-center">میدان تحریش ، ضلع شمال شرقی</p>
              <div className="flex items-center gap-4 text-center justify-center pb-4">
                <p>تلفن :</p>
                <p>0211775</p>
                <p>02122746008</p>
                <p>02122746007</p>
              </div>
            </div>
            <Map />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-center text-lg text-amber-600 mb-4">نوع غذا</h2>
          <div className="flex justify-center gap-3">
            <p className="border border-gray-300 rounded-full py-1 px-4">غذای ایرانی</p>
            <p className="border border-gray-300 rounded-full py-1 px-4">کبابی یا جگرکی</p>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default Info