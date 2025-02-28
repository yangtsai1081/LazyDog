"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import hotelStyles from "../../../../styles/modules/operatorHotel.module.css";
import { useHotel } from "@/hooks/useHotel";
import { useRouter, useParams } from "next/navigation";
import { softDeleteHotel } from "@/services/hotelService";
import Header from "../../../components/layout/header";
import My from "../../../components/hotel/my";

export default function HotelDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { hotel, loading, images } = useHotel(id);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    if (hotel) {
      setIsDeleted(hotel.is_deleted == 1);
    }
  }, [hotel]);

  if (loading) return <p className="text-center">載入中...</p>;
  if (!hotel) return <p className="text-danger text-center">找不到旅館資訊</p>;

  let businessHours = { open: "", close: "" };
  if (hotel.business_hours) {
    try {
      const parsedHours = JSON.parse(hotel.business_hours);
      businessHours = {
        open: parsedHours?.open || "未設定",
        close: parsedHours?.close || "未設定",
      };
    } catch (error) {
      console.error("business_hours JSON 解析失敗:", error);
    }
  }
// 🔹 加入 `changepage` 函數
const changepage = (path) => {
  router.push(`/hotel-coupon/${path}`);
};

  //  軟刪除函數
  const handleSoftDelete = async () => {
    if (!hotel || !hotel.id) {
      Swal.fire("錯誤", "無法刪除，找不到旅館 ID", "error");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "確定要刪除這間旅館嗎？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    });

    if (confirmDelete.isConfirmed) {
      const success = await softDeleteHotel(hotel.id);
      if (success) {
        Swal.fire("已刪除", "旅館已標記為刪除！", "success").then(() => {
          router.refresh();
        });
      } else {
        Swal.fire("刪除失敗", "請重試！", "error");
      }
    }
  };

  return (
    <>
      <Header />
      <div className={`container my-5 ${isDeleted ? "opacity-50" : ""}`}>
        <div className="row">
          <My />

          <div className="col-12 col-md-9">
            <div className="mx-auto">
              <h5 className="mb-3">旅館資訊</h5>
              <form id="hotelForm">
                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>基本資訊</h5>
                  <div className="mb-3">
                    <label className="form-label">旅館名稱 *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotel?.name || "未提供"}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">地址 *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${hotel?.county || ""}${hotel?.district || ""}${
                        hotel?.address || "未提供"
                      }`}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">電話 *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={hotel?.phone || "未提供"}
                      readOnly
                    />
                  </div>
                </div>

                {/* 旅館圖片區域 */}
                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>旅館圖片</h5>
                  <div
                    id="imagePreviewContainer"
                    className="d-flex flex-wrap gap-3 mb-2"
                  >
                    {images && images.length > 0 ? (
                      images.map((img, index) => (
                        <div key={index} className={hotelStyles.suImageCard}>
                          <img
                            src={img.url || "/images/no-image.png"}
                            alt={`旅館圖片${index + 1}`}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">無圖片可顯示</p>
                    )}
                  </div>
                </div>

                {/* 修正營業時間顯示 */}
                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>營業時間</h5>
                  <div className="mb-3 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={`開門時間：${businessHours.open}`}
                      readOnly
                    />
                    <span className="me-2">至</span>
                    <input
                      type="text"
                      className="form-control"
                      value={`關門時間：${businessHours.close}`}
                      readOnly
                    />
                  </div>
                </div>

                {/* 旅館簡介 */}
                <div className={`section ${hotelStyles.suSection}`}>
                  <h5>旅館簡介</h5>
                  <textarea
                    className="form-control"
                    value={hotel?.introduce || "未提供"}
                    readOnly
                    rows="3"
                  />
                </div>

                {/* 按鈕區域 */}
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm px-4"
                    onClick={() => changepage(`operatorDetail`)}
                  >
                    返回
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm px-4"
                    onClick={() => changepage(`hotelEdit/${id}`)}
                    disabled={isDeleted}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm px-4"
                    onClick={handleSoftDelete}
                    disabled={isDeleted}
                  >
                    刪除
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
