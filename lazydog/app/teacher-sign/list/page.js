"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import styles from "../css/teacherSignList.module.css";
import Header from "@/app/components/layout/header";
import TeacherAside from "../_components/teacher-aside";
import TeacherListC from "../_components/teacher-listC";

export default function TeacherListPage() {
  return (
    <>
      <Header/>
      <div className={`container mt-5 mb-5`}>
        <div className={`row`}>
          <TeacherAside/>
          <TeacherListC/>          
        </div>
      </div>
    </>
  );
}
