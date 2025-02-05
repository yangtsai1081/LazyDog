"use client";

import React, { useState, useEffect } from "react";
import styles from "../../../styles/modules/operatorCamera.module.css";
import couponStyles from "../../../styles/modules/operatorCoupon.module.css";
import { useRouter } from "next/navigation";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";

export default function ProfileCouponPage(props) {
  const router = useRouter();
  const { fileInputRef, avatarRef, uploadPhoto, fileChange, deletePhoto } =
    usePhotoUpload("/images/hotel/hotel-images/page-image/default-avatar.png");
  const changepage = (path) => {
    if (path) {
      router.push(`/hotel-coupon/${path}`);
    }
  };
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* 左邊*/}
          <div className="col-md-3">
            <div className="card p-3">
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <img
                    ref={avatarRef}
                    src="/images/hotel/hotel-images/page-image/Dog2.png"
                    alt="User Avatar"
                    className={`rounded-circle ${styles.suAvatarImg}`}
                  />

                  <div className={styles.dropdownItem}>
                    <button
                      className={`btn btn-light ${styles.suCameraIcon}`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="/images/hotel/hotel-images/page-image/icon-camera.png"
                        alt="相機"
                        className={styles.suCameraIconImg}
                      />
                    </button>
                    <ul className={`dropdown-menu ${styles.suDropdownMenu}`}>
                      <li>
                        <button
                          className={`text-danger dropdown-item ${styles.suDropdownItem}`}
                          onClick={deletePhoto}
                        >
                          刪除照片
                        </button>
                      </li>
                      <li>
                        <label
                          htmlFor="uploadPhoto"
                          className={`dropdown-item ${styles.dropdownItem}`}
                        >
                          上傳照片
                        </label>
                        <input
                          type="file"
                          id="uploadPhoto"
                          accept="image/*"
                          className="d-none"
                          ref={fileInputRef}
                          onChange={fileChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <h5 className="mt-2">陳大方</h5>
                <p className="text-muted">165846hote@gmail.com</p>
                <button className="btn btn-outline-success btn-sm">
                  已認證
                </button>
              </div>
              <hr />
              <ul className="list-unstyled text-start">
                <li
                  className="py-2"
                  onClick={() => changepage("operatorDetail")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-person-fill me-2"></i>會員資料
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage("operatorHotel")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-bag-check me-2"></i>訂單紀錄
                  </a>
                </li>
                <li
                  className="py-2"
                  onClick={() => changepage("profileCoupon")}
                >
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-ticket-perforated me-2"></i>我的優惠券
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-house-heart-fill me-2"></i>我的收藏
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-card-list me-2"></i>我的文章
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-hammer me-2"></i>修改密碼
                  </a>
                </li>
                <li className="py-2" onClick={() => changepage("couponList")}>
                  <a
                    className="text-decoration-none text-dark"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>登出
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 右邊 */}
          <div className="col-md-9 coupon-section">
            <h3 className="mb-3">我的優惠券</h3>

            <div className="suFeatureLinks mb-3">
              <a href="#">領取免運券</a>
              <a href="couponstatus.html">查看歷史紀錄</a>
            </div>

            <div className="coupon-input-group">
              <input
                type="text"
                className="form-control"
                placeholder="請輸入優惠代碼"
              />
              <button className="btn btn-primary">領取</button>
            </div>

            <ul className={`nav nav-tabs mb-3 ${couponStyles.suNavTabs}`}>
              <li className="nav-item">
                <a
                  className={`nav-link active ${couponStyles.suNavLink}`}
                  href="#"
                >
                  全部
                </a>
              </li>
              <li className="nav-item">
                <a className={couponStyles.suNavLink} href="#">
                  商品優惠 (05)
                </a>
              </li>
              <li className="nav-item">
                <a className={couponStyles.suNavLink} href="#">
                  課程優惠 (10)
                </a>
              </li>
              <li className="nav-item">
                <a className={couponStyles.suNavLink} href="#">
                  旅館優惠 (10)
                </a>
              </li>
            </ul>

            <div className={couponStyles.suCouponCard}>
              <span className="price">NT200</span>
              <div className="details">
                <p>
                  <strong>整單折扣！訂單滿 1,600 折 200 元</strong>
                </p>
                <p className="text-muted">有效期限: 2025/12/31</p>
                <p className="expired">⚠ 已使用</p>
              </div>
              <div className="action">
                <a href="#">前往購物</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
