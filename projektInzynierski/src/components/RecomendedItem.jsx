/* eslint-disable react/prop-types */
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";

function RecomendedItem({ recomend }) {
  const { image, name, count } = recomend;
  return (
    <CCard
      style={{ width: "18rem" }}
      className="shadow-md rounded-md transition-transform duration-200 hover:scale-105"
    >
      <CCardImage
        orientation="top"
        src={`/${image}`}
        className="object-cover h-48 w-full"
        alt={name}
      />
      <CCardBody className="bg-white text-center">
        <CCardTitle className="text-lg font-bold">{name}</CCardTitle>
        <CCardText className="text-gray-700 my-2">
          {name.length >= 40 ? `${name.slice(0, 40)}...` : name}
        </CCardText>
        <CButton color="primary" href="#" className="w-full mb-3">
          Zobacz
        </CButton>
        <p
          className={`text-sm font-medium ${
            count > 0
              ? "text-green-600"
              : count === 0
              ? "text-red-600"
              : "text-yellow-800"
          }`}
        >
          {count > 0
            ? `${count} sztk.`
            : count === 0
            ? "Zamówienie (1-4 dni)"
            : "już wkrótce"}
        </p>
      </CCardBody>
    </CCard>
  );
}

export default RecomendedItem;
