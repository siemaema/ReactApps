import React from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";

const ProductsList = ({ content, onOpenModal }) => {
  return (
    <CCard key={content.id} className="product-item grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <CCardImage
          src={content.image}
          alt={content.name}
          className="w-full h-60 object-cover rounded-md"
        />
      </div>
      <CCardBody className="col-span-1 flex flex-col justify-center">
        <CCardTitle className="text-xl font-bold mb-2">
          {content.name}
        </CCardTitle>
        <CCardText className="text-gray-700 mb-2">
          {content.description}
        </CCardText>
        <div className="flex items-center justify-between">
          <CCardText className="text-lg font-semibold">
            Cena: {content.price} zł
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            onClick={() => onOpenModal(content)} // Wywołanie funkcji z przekazanym produktem
          >
            Szczegóły
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ProductsList;
