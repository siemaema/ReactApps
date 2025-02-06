import React from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";

const ProductsList = ({ content, onOpenModal, viewMode }) => {
  return viewMode === "list" ? (
    <div
      className="flex items-center p-4 border rounded-lg bg-white shadow hover:shadow-lg transition duration-300 hover:scale-105 z-50"
      key={content.id}
    >
      <div className="flex-shrink-0 w-24 h-24">
        <img
          src={content.image}
          alt={content.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow ml-4">
        <h3 className="text-xl font-semibold text-gray-800">{content.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{content.description}</p>
        <p className="text-gray-900 text-lg font-bold">{content.price} zł</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <CButton
          color="primary"
          size="sm"
          onClick={() => onOpenModal(content)}
          className="text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
        >
          Szczegóły
        </CButton>
      </div>
    </div>
  ) : (
    <CCard
      key={content.id}
      className="product-item grid grid-cols-2 gap-4 hover:scale-110"
    >
      <div className="col-span-1">
        <CCardImage
          src={content.image}
          alt={content.name}
          className="w-full h-60 object-cover rounded-md"
        />
      </div>
      <CCardBody className="col-span-1 flex flex-col justify-center ">
        <CCardTitle className="text-xl font-bold mb-2">
          {content.name}
        </CCardTitle>
        <CCardText className="text-gray-700 mb-2">
          {content.description}
        </CCardText>
        <div className="flex items-center justify-between">
          <CCardText className="text-lg font-semibold">
            {content.price} zł
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            onClick={() => onOpenModal(content)}
          >
            Szczegóły
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ProductsList;
