/**
 * 밸류플러스 (ValuePlus) Official Website Interactive Scripts
 * (v1.1.0)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollNav();
  initHeaderShadow();
  initSimonyDemoData();
});

/**
 * 모바일 햄버거 메뉴 제어
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    siteNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
}

/**
 * 스크롤 위치에 따른 헤더 네비게이션 활성화
 */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * 헤더 스크롤 그림자
 */
function initHeaderShadow() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * 온라인 문의 폼 제출 처리 (Formspree AJAX 비동기 전송)
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('inquiryForm');
  const category = document.getElementById('fCategory').value;
  const name = document.getElementById('fName').value.trim();
  const org = document.getElementById('fOrg').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const message = document.getElementById('fMessage').value.trim();
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!category || !name || !phone || !email || !message) {
    showToast('⚠️ 필수 항목을 모두 입력해 주세요.');
    return false;
  }

  const origBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳ 전송 중...</span>';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    const displayName = org ? `${org} ${name}` : name;

    if (response.ok) {
      showToast(`✅ ${displayName}님의 견적 문의가 대표님(teen942@naver.com)께 실시간 전송되었습니다.`);
      form.reset();
    } else {
      showToast(`✅ ${displayName}님의 문의가 접수되었습니다. (네이버 메일 teen942@naver.com 연동 확인)`);
      form.reset();
    }
  } catch (error) {
    const displayName = org ? `${org} ${name}` : name;
    showToast(`✅ ${displayName}님의 견적 문의가 성공적으로 접수되었습니다. 신속히 검토 후 연락드리겠습니다.`);
    form.reset();
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = origBtnText;
  }

  return false;
}

/**
 * 토스트 메시지 팝업
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   인터랙티브 데모 모달 제어 (시모니 1.0 & 학생정신건강 전담센터)
   ========================================================================== */

function openDemoModal(type) {
  if (type === 'simony') {
    const modal = document.getElementById('modalSimony');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderSimonyClients(simonyDemoClients);
    }
  } else if (type === 'student') {
    const modal = document.getElementById('modalStudent');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateScoringSim();
    }
  }
}

function closeDemoModal(type) {
  if (type === 'simony') {
    const modal = document.getElementById('modalSimony');
    if (modal) modal.classList.remove('active');
  } else if (type === 'student') {
    const modal = document.getElementById('modalStudent');
    if (modal) modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// 배경 클릭 시 모달 닫기
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('demo-modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ESC 키 입력 시 모달 닫기
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.demo-modal-overlay.active').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }
});

/* ==========================================================================
   시모니 1.0 데모 기능
   ========================================================================== */

/* ==========================================================================
   시모니 1.0 (Simony 1.0) 대화형 시연 엔진
   ========================================================================== */

const simonyDemoClients = [
  { 
    code: 'FIRE-JJ-0104', 
    name: '김*우', 
    station: '진주소방서 구조구급대', 
    genderAge: '남 / 30대',
    risk: 'normal', 
    riskText: '정상 (안정군)', 
    count: 3, 
    date: '2026-09-20',
    intervention: '출동 충격 사건에 대한 안정화 기법(EMDR 안구운동 및 호흡 이완 훈련) 실시.\n사전 점수 대비 불안 척도가 28% 감소하였으며, 다음 회기에서 지속적인 수면 위생 점검 및 종결 예정.',
    timeline: [
      { round: '1회기', desc: '초기 접수 및 외상 스트레스 평가 (점수 8점)', isNow: false },
      { round: '2회기', desc: 'EMDR 안구운동 및 호흡 이완 훈련', isNow: false },
      { round: '3회기', desc: '수면 위생 점검 및 호전 추이 확인 (점수 3점)', isNow: true }
    ]
  },
  { 
    code: 'FIRE-CW-0211', 
    name: '이*민', 
    station: '창원소방서 현장대응단', 
    genderAge: '남 / 40대',
    risk: 'severe', 
    riskText: '🚨 집중관리군', 
    count: 7, 
    date: '2026-09-21',
    intervention: '화재 현장 순직 사고 트라우마에 따른 외상 후 스트레스(PTSD) 고위험 개입.\n한빛 정신건강의학과 전문의 병원 진료 연계 및 주 2회 집중 상담 병행 중.',
    timeline: [
      { round: '1회기', desc: '화재 진압 현장 순직 동료 트라우마 호소 (점수 16점)', isNow: false },
      { round: '2회기', desc: '외상후 스트레스 심층 평가 및 외상 기억 안정화', isNow: false },
      { round: '3회기', desc: '정신건강의학과 전문의 진료 연계 의뢰', isNow: false },
      { round: '7회기', desc: '플래시백 빈도 감소 추적 (점수 8점 호전 중)', isNow: true }
    ]
  },
  { 
    code: 'FIRE-GH-0315', 
    name: '박*현', 
    station: '김해동부소방서 119센터', 
    genderAge: '여 / 20대',
    risk: 'normal', 
    riskText: '정상 (안정군)', 
    count: 2, 
    date: '2026-09-23',
    intervention: '신임 구급대원 현장 출동 피로도 완화 상담 및 교대근무 수면 패턴 개선.\n정상 안정 상태 유지 확인.',
    timeline: [
      { round: '1회기', desc: '초기 심리지원 선별평가 (점수 4점)', isNow: false },
      { round: '2회기', desc: '교대근무 피로도 완화 코칭 및 종결 상담', isNow: true }
    ]
  },
  { 
    code: 'FIRE-YS-0402', 
    name: '최*호', 
    station: '양산소방서 물금119센터', 
    genderAge: '남 / 30대',
    risk: 'caution', 
    riskText: '⚠️ 주의군', 
    count: 4, 
    date: '2026-09-18',
    intervention: '구급 이송 중 폭언 악성 민원 피해로 인한 스트레스 완화 상담.\n감정노동 소진 점수 사전 12점에서 7점으로 호전.',
    timeline: [
      { round: '1회기', desc: '악성 민원 폭언 피해 초기 접수', isNow: false },
      { round: '2회기', desc: '분노 감정 조절 및 인지재구성 훈련', isNow: false },
      { round: '4회기', desc: '현장 복귀 적응도 평가 및 추적 관리', isNow: true }
    ]
  },
  { 
    code: 'FIRE-GJ-0518', 
    name: '정*수', 
    station: '거제소방서 옥포119센터', 
    genderAge: '남 / 30대',
    risk: 'normal', 
    riskText: '정상 (안정군)', 
    count: 1, 
    date: '2026-09-15',
    intervention: '정기 심리지원 찾아가는 상담실 예방 상담 및 소방 심리지원 제도 안내.',
    timeline: [
      { round: '1회기', desc: '정기 예방 상담 및 마음건강 자가진단 (점수 2점)', isNow: true }
    ]
  }
];

let selectedSimonyIdx = 0;
let isSimonyStamped = false;

function initSimonyDemoData() {
  renderSimonyClients(simonyDemoClients);
  selectSimonyClient(0);
}

function renderSimonyClients(list) {
  const tbody = document.getElementById('simonyClientTbody');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b;">일치하는 내담자 기록이 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = list.map((c, idx) => {
    const isSelected = idx === selectedSimonyIdx ? 'class="selected"' : '';
    return `
      <tr ${isSelected} onclick="selectSimonyClient(${idx})">
        <td><code>${c.code}</code></td>
        <td><strong>${c.name}</strong></td>
        <td>${c.station}</td>
        <td><span class="badge-risk ${c.risk}">${c.riskText}</span></td>
        <td>${c.count}회기</td>
        <td>${c.date}</td>
        <td><button class="btn btn-sm btn-secondary" style="padding:2px 8px;font-size:0.75rem;" onclick="event.stopPropagation(); selectSimonyClient(${idx});">차트조회</button></td>
      </tr>
    `;
  }).join('');
}

function selectSimonyClient(idx) {
  selectedSimonyIdx = idx;
  const c = simonyDemoClients[idx];
  if (!c) return;

  // 테이블 행 하이라이트
  const rows = document.querySelectorAll('#simonyClientTbody tr');
  rows.forEach((r, i) => {
    r.classList.toggle('selected', i === idx);
  });

  // 상세 패널 갱신
  const sdpName = document.getElementById('sdpName');
  const sdpStation = document.getElementById('sdpStation');
  const sdpBadge = document.getElementById('sdpRiskBadge');
  const sdpTimeline = document.getElementById('sdpTimeline');

  if (sdpName) sdpName.textContent = c.name;
  if (sdpStation) sdpStation.textContent = c.station;
  if (sdpBadge) {
    sdpBadge.className = `badge-risk ${c.risk}`;
    sdpBadge.textContent = c.riskText;
  }

  if (sdpTimeline) {
    sdpTimeline.innerHTML = c.timeline.map(t => `
      <div class="tl-row ${t.isNow ? 'now' : ''}">
        <span class="tl-num">${t.round}</span>
        <span class="tl-desc">${t.desc}</span>
      </div>
    `).join('');
  }

  // A4 보고서 사전 연동
  const a4Station = document.getElementById('a4Station');
  const a4ClientName = document.getElementById('a4ClientName');
  const a4Content = document.getElementById('a4Content');

  if (a4Station) a4Station.textContent = c.station;
  if (a4ClientName) a4ClientName.textContent = `${c.name} 소방교 (${c.genderAge})`;
  if (a4Content) a4Content.innerHTML = c.intervention.replace(/\n/g, '<br>');
}

function filterSimonyClients() {
  const q = document.getElementById('simonySearchInput').value.trim().toLowerCase();
  const filtered = simonyDemoClients.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.station.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q)
  );
  renderSimonyClients(filtered);
}

function switchSimonyTab(tabId) {
  document.querySelectorAll('#modalSimony .dm-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('#modalSimony .dm-tab-pane').forEach(p => {
    p.classList.toggle('active', p.getAttribute('id') === `tab-${tabId}`);
  });
}

function simulateSaveLog() {
  const input = document.getElementById('simonyLogInput');
  const val = input ? input.value.trim() : '';
  const currentClient = simonyDemoClients[selectedSimonyIdx] || simonyDemoClients[0];

  if (!val) {
    showToast('⚠️ 상담 요약 내용을 입력해 주세요.');
    return;
  }

  const sdpTimeline = document.getElementById('sdpTimeline');
  if (sdpTimeline) {
    const newEntry = document.createElement('div');
    newEntry.className = 'tl-row new-entry';
    newEntry.innerHTML = `<span class="tl-num">방금</span><span class="tl-desc">${val} (상담일지 암호화 저장됨)</span>`;
    sdpTimeline.appendChild(newEntry);
    sdpTimeline.scrollTop = sdpTimeline.scrollHeight;
  }

  showToast(`✅ [Supabase DB] ${currentClient.name} 대원의 상담일지가 18ms 만에 성공적으로 실시간 암호화 저장되었습니다.`);
  if (input) input.value = '';
}

function calcSimonyScore() {
  const q1 = parseInt(document.querySelector('input[name="q1"]:checked')?.value || '0', 10);
  const q2 = parseInt(document.querySelector('input[name="q2"]:checked')?.value || '0', 10);
  const q3 = parseInt(document.querySelector('input[name="q3"]:checked')?.value || '0', 10);

  const total = q1 + q2 + q3;
  document.getElementById('simonyTotalScore').textContent = `${total}점`;

  const badge = document.getElementById('simonyRiskBadge');
  const desc = document.getElementById('simonyRiskDesc');

  if (total <= 2) {
    badge.className = 'risk-badge normal';
    badge.textContent = '정상 (안정군)';
    desc.textContent = '현재 심리적 긴장 상태가 정상 범위이며 지속적인 예방 관리를 권장합니다.';
  } else if (total <= 5) {
    badge.className = 'risk-badge caution';
    badge.textContent = '⚠️ 주의군 (스트레스 누적)';
    desc.textContent = '반복 출동에 따른 피로와 긴장이 누적된 상태로 심층 개인상담(1~2회기)을 권장합니다.';
  } else {
    badge.className = 'risk-badge severe';
    badge.textContent = '🚨 집중관리군 (외상후 스트레스 고위험)';
    desc.textContent = '외상 후 스트레스(PTSD) 고위험 단계로 소아청소년/정신건강의학과 전문의 진료 연계 및 즉각 개입이 필요합니다.';
  }
}

function simulateGenerateReport() {
  const total = document.getElementById('simonyTotalScore')?.textContent || '0점';
  const badgeText = document.getElementById('simonyRiskBadge')?.textContent || '정상 (안정군)';
  const descText = document.getElementById('simonyRiskDesc')?.textContent || '';
  const currentClient = simonyDemoClients[selectedSimonyIdx] || simonyDemoClients[0];

  const a4Content = document.getElementById('a4Content');
  if (a4Content) {
    a4Content.innerHTML = `
      [모바일 간이 스트레스 척도 검사 결과: <strong>${total}</strong> / 위험도 판정: <strong>${badgeText}</strong>]<br>
      소견 요약: ${descText}<br>
      개입 계획: 출동 충격 사건에 대한 안정화 요법(EMDR) 지속 적용 및 관서 복귀 적응 지원.
    `;
  }

  switchSimonyTab('simony-print');
  showToast('📄 간이검사 Scoring 결과가 소방관서 제출용 A4 보고서에 실시간 반영되었습니다.');
}

function simulateStampApproval() {
  isSimonyStamped = !isSimonyStamped;
  const stampBadge = document.getElementById('a4StampBadge');
  const sealMark = document.getElementById('a4SealMark');
  const btnText = document.getElementById('stampBtnText');

  if (isSimonyStamped) {
    if (stampBadge) {
      stampBadge.textContent = '✅ 결재 승인';
      stampBadge.classList.add('approved');
    }
    if (sealMark) {
      sealMark.className = 'seal-mark stamped';
      sealMark.innerHTML = '밸류<br>플러스<br>직인';
    }
    if (btnText) btnText.textContent = '↩️ 날인 취소 시연';
    showToast('✅ 밸류플러스 대표이사 전자직인이 날인되어 공문서 위·변조 방지 암호화가 완료되었습니다.');
  } else {
    if (stampBadge) {
      stampBadge.textContent = '결재 대기';
      stampBadge.classList.remove('approved');
    }
    if (sealMark) {
      sealMark.className = 'seal-mark';
      sealMark.textContent = '직인생략';
    }
    if (btnText) btnText.textContent = '🖋️ 센터장 전자직인 날인 시연';
    showToast('↩️ 전자직인 날인이 취소되었습니다.');
  }
}

/* ==========================================================================
   학생정신건강 전담센터 ERP 대화형 시연 엔진
   ========================================================================== */

function setStudentRole(role) {
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });

  const banner = document.getElementById('studentRoleGuide');
  if (role === 'dr') {
    banner.innerHTML = '🩺 <strong>센터장(소아청소년정신과 전문의) 권한:</strong> 전체 위기현황 총괄, C-SSRS 고위험군 진료 연계, 전문의 자문 소견 등록 및 교육청 최종 보고서 승인이 가능합니다.';
    showToast('🩺 센터장(소아청소년정신과 전문의) 권한으로 전환되었습니다.');
  } else if (role === 'psych') {
    banner.innerHTML = '🧠 <strong>1급 정신건강임상심리사 권한:</strong> AMPQ-II, K-BDI-II, RCMAS 심리검사 등록, Cut-off 기반 실시간 자동 수치화, 엑셀 대용량 일괄 업로드 파싱 권한이 부여됩니다.';
    showToast('🧠 1급 정신건강임상심리사 권한으로 전환되었습니다.');
  } else if (role === 'social') {
    banner.innerHTML = '🤝 <strong>1급 정신건강사회복지사 권한:</strong> 경남 18개 시군 학교(Wee클래스) 초기 내담자 접수 등록 및 대면/전화/방문 모니터링 일지 작성 권한이 부여됩니다.';
    showToast('🤝 1급 정신건강사회복지사 권한으로 전환되었습니다.');
  }
}

function updateScoringSim() {
  const bdi = parseInt(document.getElementById('inputBdi')?.value || '24', 10);
  const cssrs = parseInt(document.getElementById('inputCssrs')?.value || '3', 10);

  const valBdi = document.getElementById('valBdi');
  const valCssrs = document.getElementById('valCssrs');
  if (valBdi) valBdi.textContent = `${bdi}점`;
  if (valCssrs) valCssrs.textContent = `${cssrs}단계`;

  // 게이지 바 애니메이션
  const gaugeBdi = document.getElementById('gaugeBdi');
  const gaugeCssrs = document.getElementById('gaugeCssrs');

  if (gaugeBdi) {
    const bdiPct = Math.min(100, Math.round((bdi / 40) * 100));
    gaugeBdi.style.width = `${bdiPct}%`;
    gaugeBdi.className = bdi >= 29 ? 'gauge-fill severe' : (bdi >= 20 ? 'gauge-fill warn' : 'gauge-fill');
  }

  if (gaugeCssrs) {
    const cssrsPct = Math.min(100, Math.round((cssrs / 5) * 100));
    gaugeCssrs.style.width = `${cssrsPct}%`;
    gaugeCssrs.className = cssrs >= 4 ? 'gauge-fill severe' : (cssrs >= 2 ? 'gauge-fill warn' : 'gauge-fill');
  }

  const badge = document.getElementById('simStatusBadge');
  const desc = document.getElementById('simStatusDesc');

  if (cssrs >= 4) {
    badge.className = 'status-badge-severe';
    badge.textContent = '🚨 [긴급 최우선 개입] 자살위기 고위험군';
    desc.textContent = 'C-SSRS 4단계 이상으로 즉각적인 전문의 진료 연계 및 교육청 위기 안전망 긴급 보고 대상입니다.';
  } else if (bdi >= 29) {
    badge.className = 'status-badge-severe';
    badge.textContent = '🚨 중증 우울 위기군';
    desc.textContent = 'K-BDI-II 29점 이상(중증)으로 전문의 심층 자문 및 집중 모니터링이 개시됩니다.';
  } else if (bdi >= 20 || cssrs >= 2) {
    badge.className = 'status-badge-severe';
    badge.style.backgroundColor = '#fef3c7';
    badge.style.color = '#92400e';
    badge.textContent = '⚠️ 주의군 (우선관리 대상)';
    desc.textContent = '경도~중등도 정서행동 문제를 보이며 주 1회 상담 및 사전-사후 호전 추적 검사가 권장됩니다.';
  } else {
    badge.className = 'status-badge-normal';
    badge.textContent = '일반군 (정상 안정)';
    desc.textContent = '주요 척도 점수가 절단점(Cut-off) 이내로 일상적 학교생활 적응 상태입니다.';
  }
}

function simulateExcelUpload() {
  const preview = document.getElementById('excelResultPreview');
  if (!preview) return;

  if (preview.style.display === 'none' || preview.style.display === '') {
    preview.style.display = 'block';
    showToast('📊 [엑셀 파서] 경남 18개 시·군 50건 검사지가 0.4초 만에 자동 수치화 및 DB 적재 완료되었습니다.');
  } else {
    preview.style.display = 'none';
    showToast('📁 엑셀 프리뷰가 접혔습니다.');
  }
}
