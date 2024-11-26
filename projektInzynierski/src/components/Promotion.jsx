import { CButton, CImage } from "@coreui/react";

function Promotion() {
  return (
    <div className="h-[700px] flex justify-center align-middle bg-blue-400 mt-3">
      <div className="grid grid-flow-col grid-cols-2 grid-rows-5 p-3">
        <h1 className="grid col-span-2 my-4 justify-center pt-3 text-white text-3xl font-bold">
          Oferta specjalna
        </h1>
        <div className="grid col-span-2 row-span-4 grid-cols-2 gap-4 px-9 bg-slate-200 py-2 rounded-md">
          <CImage
            src="/logo.jpg"
            alt="Promocja"
            rounded
            thumbnail
            className="object-fill w-full h-full my-auto"
          />
          <div className="flex justify-center flex-col gap-2">
            <h2 className="text-xl font-semibold">
              Jakas oferta to jeszcze do zmiany
            </h2>
            <p className="text-gray-700">
              Zaoszczędź nawet 22% przy zakupie zestawów lakierów bezbarwnych
              Mobihel V5. Dostępne opakowania: 1L oraz 5L.
            </p>
            <CButton
              as="input"
              type="button"
              color="primary"
              value="Sprawdz"
              className="w-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
