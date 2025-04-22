import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

const PaymentQRCode = (props) => {
  const { amount, onChosseData } = props;

  const [qrCodeData, setQrCodeData] = useState("");

  const handleClick = () => {
    onChosseData(true);
  };

  useEffect(() => {
    if (amount > 0) {
      generateQRCode(amount);
    }
  }, [amount]); // Tạo lại mã QR khi số tiền thay đổi

  // Hàm tạo mã QR chuyển khoản
  const generateQRCode = async (amount) => {
    const bankAccountInfo = {
      bank_name: "Ngân Hàng TECHCOMBANK", // Tên ngân hàng (tùy chỉnh)
      account_name: "Phạm Mạnh Hùng", // Tên tài khoản người nhận (tùy chỉnh)
      account_number: "19050114190010", // Số tài khoản người nhận (tùy chỉnh)
      amount: amount, // Số tiền cần chuyển
      currency: "VND", // Loại tiền (VND)
    };

    // Tạo chuỗi thông tin QR Code từ dữ liệu chuyển khoản
    const paymentInfo = `
      Bank: ${bankAccountInfo.bank_name}
      Account: ${bankAccountInfo.account_name}
      Account Number: ${bankAccountInfo.account_number}
      Amount: ${bankAccountInfo.amount} ${bankAccountInfo.currency}
    `;

    try {
      // Tạo mã QR từ chuỗi dữ liệu
      const qrCode = await QRCode.toDataURL(paymentInfo);
      setQrCodeData(qrCode); // Lưu mã QR vào state
    } catch (error) {
      console.error("Lỗi khi tạo mã QR:", error);
    }
  };

  return (
    <>
      <div>
        {qrCodeData ? (
          <div>
            <h2>Quét mã QR để chuyển khoản</h2>
            <img className="mt-2" src={qrCodeData} alt="Payment QR Code" />
          </div>
        ) : (
          <p>Vui lòng nhập số tiền để tạo mã QR.</p>
        )}
      </div>

      <div>
        <button onClick={handleClick} className="checkout_btn-paynow ">
          Xác nhận thành công
        </button>
      </div>
    </>
  );
};

export default PaymentQRCode;
