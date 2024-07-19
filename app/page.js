"use client";

import React, { useState } from 'react';
import './styles/globals.css';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const response = await fetch('https://marops-backend-f5002c4af087.herokuapp.com/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setLoading(false);
    setLinks(data);
  };

  const downloadFile = async (filename, label) => {
    const response = await fetch(`https://marops-backend-f5002c4af087.herokuapp.com/download/${filename}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = label;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadLabels = {
    avg_csv_path: "Average LTV",
    total_csv_path: "Total Monthly Revenue",
    repeat_csv_path: "Repeat Purchase Rate",
    cohort_sizes_csv_path: "Cohort Sizes"
  };

  return (
    <div className="container">
      <h1>Cohort Analysis</h1>
      <form id="upload-form" onSubmit={handleSubmit}>
        <label htmlFor="file">Upload Shopify CSV</label>
        <input type="file" name="file" className="form-control-file" />
        <button type="submit" className="btn btn-primary mt-3">Upload</button>
      </form>
      {loading && <div id="spinner" className="spinner"></div>}
      {Object.keys(links).length > 0 && (
        <div className="download-results">
          <h2>Download Results</h2>
          {Object.keys(links).map((key) => (
            <a key={key} onClick={() => downloadFile(links[key], downloadLabels[key])} className="btn btn-link">
              {downloadLabels[key]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
