"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useHotel } from "@/hooks/useHotel";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import hotelStyles from "../../../../styles/modules/operatorHotel.module.css";
import Header from "../../../components/layout/header";
import My from "../../../components/hotel/my";

export default function HotelEditPage() {
  const router = useRouter();
  const { id } = useParams(); // 取得旅館 ID
  const { hotel, images: hotelImages } = useHotel(id); // 取得旅館資訊 + 圖片
  const imageUploadRef = useRef(null);
  const [images, setImages] = useState([]);

  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");

  const [formData, setFormData] = useState({
    name: "",
    county: "",
    district: "",
    address: "",
    phone: "",
    businessHours: { open: "", close: "" },
    introduce: "",
  });
  useEffect(() => {
    if (hotelImages) {
      setImages(hotelImages);
    }
  }, [hotelImages]);
  // useEffect當 hotel 有資料時，設定 formData
  useEffect(() => {
    if (hotel) {
      let parsedBusinessHours = hotel.business_hours;

      if (typeof hotel.business_hours === "string") {
        try {
          parsedBusinessHours = JSON.parse(hotel.business_hours);
          if (!parsedBusinessHours.open || !parsedBusinessHours.close) {
            parsedBusinessHours = { open: "", close: "" };
          }
        } catch (error) {
          console.error("business_hours JSON 解析失敗:", error);
          parsedBusinessHours = { open: "", close: "" };
        }
      }

      setFormData({
        name: hotel.name || "",
        county: hotel.county || "",
        district: hotel.district || "",
        address: hotel.address || "",
        phone: hotel.phone || "",
        businessHours: parsedBusinessHours || { open: "", close: "" }, // ✅ 統一為一組營業時間
        introduce: hotel.introduce || "",
      });
    }
  }, [hotel]);

  // 表單
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 營業時間變更
  const handleTimeChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      businessHours: { ...prev.businessHours, [type]: value },
    }));
  };

  //  確保時間格式
  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  // 儲存
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("loginWithToken");
      if (!token) throw new Error("未登入，請重新登入");

      const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          businessHours: JSON.stringify(formData.businessHours),
        }),
      });

      if (!response.ok) throw new Error(`更新失敗，錯誤碼: ${response.status}`);

      alert("更新成功！");
      router.push(`/hotel-coupon/hotelDetail/${id}`);
    } catch (error) {
      console.error("更新失敗:", error);
      alert("更新失敗，請重試");
    }
  };
  const handleSetMainImage = async (imageId) => {
    try {
      const response = await fetch(`/api/hotels/${id}/main-image/${imageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("無法更新主圖片");
      Swal.fire("成功", "主圖片已更新", "success").then(() => {
        router.refresh(); // 更新頁面
      });
    } catch (error) {
      Swal.fire("錯誤", error.message, "error");
    }
  };
  const handleDeleteImage = async (imageId) => {
    try {
      const token = localStorage.getItem("loginWithToken");

      // SweetAlert2 刪除確認
      const confirmDelete = await Swal.fire({
        title: "確定要刪除這張圖片嗎？",
        text: "刪除後無法恢復！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
      });

      if (!confirmDelete.isConfirmed) return;

      // 發送 DELETE 請求
      const response = await fetch(
        `http://localhost:5000/api/hotels/${id}/image/${imageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("刪除失敗");

      Swal.fire("已刪除", "圖片已成功刪除！", "success");

      // 即時更新圖片列表
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
    } catch (error) {
      Swal.fire("錯誤", error.message, "error");
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <My />

          <div className="col-12 col-md-9 mx-auto">
            <h3 className="mb-3">編輯旅館資訊</h3>
            <form id="editForm">
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>基本資訊</h5>
                <div className="mb-3">
                  <label>
                    旅館名稱 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                {/*  地址輸入：分為 縣市、區、詳細地址 */}
                <div className="mb-3">
                  <label>縣市</label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>區</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>詳細地址</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>

                <div className="mb-3">
                  <label>
                    電話 <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${hotelStyles.suFormControl}`}
                  />
                </div>
              </div>

              {/* 旅館圖片：從 API 獲取 */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館圖片</h5>
                <div className="d-flex flex-wrap gap-3 mb-2">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <div key={index} className={hotelStyles.suImageCard}>
                        <img src={img.url} alt={`旅館圖片 ${index + 1}`} />

                        {/* 主圖片標記 */}
                        {hotel.main_image_id === img.id && (
                          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                            主圖片
                          </span>
                        )}

                        {/* 刪除圖片按鈕 (防止刪除主圖片) */}
                        <button
                          type="button"
                          className={hotelStyles.suDeleteBtn}
                          onClick={() => handleDeleteImage(img.id)}
                          disabled={hotel.main_image_id === img.id} // 不能刪除主圖片
                        >
                          &times;
                        </button>

                        {/* 設為主圖片按鈕 */}
                        {hotel.main_image_id !== img.id && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary mt-1"
                            onClick={() => handleSetMainImage(img.id)}
                          >
                            設為主圖片
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">無圖片可顯示</p>
                  )}
                </div>

                {/* 圖片上傳功能 */}
                <input
                  type="file"
                  ref={imageUploadRef}
                  className="form-control d-none"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-2"
                  onClick={uploadPhoto}
                >
                  + 新增圖片
                </button>
              </div>

              {/* 營業時間（統一顯示為一組） */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>營業時間 (適用於星期一到星期日)</h5>
                <div className="mb-3 d-flex align-items-center">
                  <label className="me-2" style={{ width: "120px" }}>
                    開門時間
                  </label>
                  <input
                    type="time"
                    name="open"
                    value={formatTime(formData.businessHours.open)}
                    onChange={(e) => handleTimeChange("open", e.target.value)}
                    className="form-control me-2"
                    step="3600"
                    style={{ width: "150px" }}
                  />
                  <span className="me-2">至</span>
                  <input
                    type="time"
                    name="close"
                    value={formatTime(formData.businessHours.close)}
                    onChange={(e) => handleTimeChange("close", e.target.value)}
                    className="form-control"
                    step="3600"
                    style={{ width: "150px" }}
                  />
                </div>
              </div>

              {/* 旅館簡介 */}
              <div className={`section ${hotelStyles.suSection}`}>
                <h5>旅館簡介</h5>
                <textarea
                  name="introduce"
                  value={formData.introduce}
                  onChange={handleChange}
                  rows="3"
                  className={`form-control ${hotelStyles.suFormControl}`}
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className={`btn btn-sm px-4 ${hotelStyles.suBtnSecondary}`}
                  onClick={() => router.push(`/hotel-coupon/hotel/${id}`)}
                >
                  返回
                </button>

                <button
                  type="button"
                  className={`btn btn-sm px-4 ${hotelStyles.suBtnSuccess}`}
                  onClick={handleSave}
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
