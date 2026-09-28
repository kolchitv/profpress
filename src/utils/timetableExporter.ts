import { TeacherProfile, TimetableSlot } from "../types";

export const exportTimetableToWordDoc = (
  teacherProfile: TeacherProfile,
  timetableTitle: string,
  slots: TimetableSlot[],
  subTitle: string = "فترة الدعم المكثف وفق مقاربة طارل (TaRL) • مؤسسات الريادة"
) => {
  const DAYS_OF_WEEK = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  // Group slots by day
  const slotsByDay: Record<string, TimetableSlot[]> = {};
  DAYS_OF_WEEK.forEach((day) => {
    slotsByDay[day] = slots
      .filter((s) => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  const tableRows = DAYS_OF_WEEK.map((day) => {
    const daySlots = slotsByDay[day] || [];
    const slotsContent =
      daySlots.length === 0
        ? `<td colspan="4" style="text-align: center; color: #888; font-style: italic; padding: 8px;">لا توجد حصص مبرمجة</td>`
        : daySlots
            .map(
              (slot, idx) => `
          <tr style="background-color: ${idx % 2 === 0 ? "#ffffff" : "#f8fafc"};">
            ${idx === 0 ? `<td rowspan="${daySlots.length}" style="font-weight: bold; background-color: #1e3a8a; color: white; text-align: center; vertical-align: middle; width: 90px;">${day}</td>` : ""}
            <td style="text-align: center; direction: ltr; font-family: monospace; font-weight: bold; padding: 6px; width: 110px;">${slot.startTime} - ${slot.endTime}</td>
            <td style="font-weight: bold; color: #0f172a; padding: 6px; width: 140px;">${slot.subject}</td>
            <td style="color: #334155; padding: 6px;">${slot.unitOrActivity}</td>
            <td style="text-align: center; font-size: 11px; background-color: #f1f5f9; padding: 6px; width: 90px;">${slot.group}</td>
          </tr>
        `
            )
            .join("");

    if (daySlots.length === 0) {
      return `
        <tr>
          <td style="font-weight: bold; background-color: #1e3a8a; color: white; text-align: center; padding: 8px;">${day}</td>
          <td colspan="4" style="text-align: center; color: #888; font-style: italic; padding: 8px;">لا توجد حصص</td>
        </tr>
      `;
    }
    return slotsContent;
  }).join("");

  const docHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${timetableTitle}</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 1.2cm;
        }
        body {
          font-family: 'Arial', 'Calibri', 'Cairo', sans-serif;
          direction: rtl;
          text-align: right;
          color: #0f172a;
          margin: 0;
          padding: 0;
        }
        .header-box {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .grid-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 14px;
        }
        .grid-table th {
          background-color: #1e3a8a;
          color: white;
          padding: 8px;
          font-size: 12px;
          border: 1px solid #94a3b8;
          text-align: center;
        }
        .grid-table td {
          border: 1px solid #cbd5e1;
          padding: 6px 8px;
          font-size: 11px;
        }
        .signatures {
          margin-top: 24px;
          width: 100%;
          border-collapse: collapse;
        }
        .signatures td {
          width: 33.33%;
          border: 1px dashed #64748b;
          text-align: center;
          padding: 16px;
          vertical-align: top;
          height: 70px;
        }
        .quote-box {
          margin-top: 14px;
          padding: 8px 12px;
          background-color: #eff6ff;
          border-right: 4px solid #2563eb;
          font-size: 10px;
          color: #1e3a8a;
        }
      </style>
    </head>
    <body>
      <div class="header-box">
        <table style="width: 100%; border: none;">
          <tr>
            <td style="text-align: right; vertical-align: top; width: 35%; font-size: 11px; line-height: 1.4;">
              <strong>المملكة المغربية</strong><br>
              <strong>وزارة التربية الوطنية والتعليم الأولي والرياضة</strong><br>
              الأكاديمية الجهوية: ${teacherProfile.academy || "................................"}<br>
              المديرية الإقليمية: ${teacherProfile.directorate || "................................"}
            </td>
            <td style="text-align: center; vertical-align: middle; width: 30%;">
              <h2 style="margin: 0; font-size: 16px; color: #1e3a8a;">${timetableTitle}</h2>
              <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: bold; color: #0284c7;">${subTitle}</p>
              <p style="margin: 2px 0 0 0; font-size: 10px; color: #64748b;">الموسم الدراسي: ${teacherProfile.schoolYear}</p>
            </td>
            <td style="text-align: left; vertical-align: top; width: 35%; font-size: 11px; line-height: 1.4;">
              المؤسسة التعليمية: <strong>${teacherProfile.institution || "............................"}</strong><br>
              الأستاذ(ة): <strong>${teacherProfile.fullNameAr || "............................"}</strong><br>
              رقم التأجير (SOM): <strong>${teacherProfile.somNumber || "............................"}</strong><br>
              المستوى والقسم: <strong>${teacherProfile.assignedLevel || "............................"}</strong>
            </td>
          </tr>
        </table>
      </div>

      <table class="grid-table">
        <thead>
          <tr>
            <th>اليوم</th>
            <th>التوقيت</th>
            <th>المادة</th>
            <th>المكون / النشاط الديداكتيكي</th>
            <th>الفوج</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <div class="quote-box">
        <strong>مرجع تنظيمي:</strong> "يعتبر استعمال الزمن الوثيقة التنظيمية الأساسية التي تحدد أوقات الدخول والخروج، وتنظم الحصص الدراسية وتوزيع المواد بشكل متوازن... ويراعى في إعداده التفاعل بين العنصر البشري، عنصر الزمن، وعنصر المكان، سواء بالدعم العام أو بالدعم المكثف الموجه لمجموعات صغيرة من المتعلمين."
      </div>

      <table class="signatures">
        <tr>
          <td>
            <strong>الأستاذ(ة)</strong><br><br>
            <span style="font-size: 9px; color: #888;">حرر في: ........................</span>
          </td>
          <td>
            <strong>مدير(ة) المؤسسة</strong><br><br>
            <span style="font-size: 9px; color: #888;">مصادق عليه بتاريخ: ........................</span>
          </td>
          <td>
            <strong>المفتش(ة) التربوي(ة)</strong><br><br>
            <span style="font-size: 9px; color: #888;">مفتش(ة) المقاطعة التربوية</span>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", docHtml], {
    type: "application/msword;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${timetableTitle.replace(/[\s\/:*?"<>|]+/g, "_")}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportTimetableToCsv = (
  teacherProfile: TeacherProfile,
  timetableTitle: string,
  slots: TimetableSlot[]
) => {
  const headers = ["اليوم", "من", "إلى", "المادة", "المكون / النشاط", "الفوج المستهدف", "الأستاذ", "المؤسسة", "المستوى"];
  const rows = slots.map((s) => [
    `"${s.day}"`,
    `"${s.startTime}"`,
    `"${s.endTime}"`,
    `"${s.subject}"`,
    `"${s.unitOrActivity.replace(/"/g, '""')}"`,
    `"${s.group}"`,
    `"${teacherProfile.fullNameAr}"`,
    `"${teacherProfile.institution}"`,
    `"${teacherProfile.assignedLevel}"`,
  ]);

  const csvContent = "\ufeff" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${timetableTitle.replace(/[\s\/:*?"<>|]+/g, "_")}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
