# FE Design Plan — Ứng dụng quản lý vận chuyển nông sản

> **Nguồn yêu cầu:** `Giao diện Người gửi hàng (1).doc`  
> **Phạm vi:** Kế hoạch thiết kế Frontend, ưu tiên luồng **Người gửi hàng**, đồng thời chuẩn bị kiến trúc để mở rộng cho **Tài xế** và **Doanh nghiệp**.  
> **Lưu ý:** Nội dung nghiệp vụ bên dưới được lấy từ tài liệu nguồn. Các mục có nhãn **[ĐỀ XUẤT FE]** là đề xuất phục vụ triển khai giao diện, không phải yêu cầu nghiệp vụ bắt buộc.

---

## 1. Tổng quan hệ thống

Ứng dụng có 3 nhóm người dùng:

1. **Người gửi hàng**
   - Chủ vựa
   - Thương lái
   - Điểm thu gom
   - Mục tiêu: đưa nông sản vào hệ thống và tạo hồ sơ số lô hàng.

2. **Người vận chuyển**
   - Tài xế xe lạnh
   - Tài xế container lạnh
   - Mục tiêu: vận chuyển đúng lô hàng, duy trì điều kiện bảo quản và xử lý sự cố.

3. **Doanh nghiệp**
   - Mục tiêu: kiểm soát toàn trình và theo dõi chất lượng lô hàng.

Tài liệu nguồn xác định các nhóm chức năng chính cho từng bên, trong đó luồng Người gửi hàng là:

```text
Đăng nhập
   ↓
Trang chủ
   ↓
Tạo hồ sơ số lô hàng
   ↓
Tạo mã QR
   ↓
Xác nhận bàn giao cho tài xế
   ↓
Lịch sử lô hàng
```

---

# 2. Mục tiêu thiết kế FE

## 2.1. Mục tiêu chính

Frontend cần:

- Dễ sử dụng với người dùng không chuyên về công nghệ.
- Giảm tối đa việc nhập liệu thủ công.
- Làm nổi bật trạng thái lô hàng.
- Tạo quy trình rõ ràng từ tạo lô → QR → bàn giao.
- Có thể mở rộng cùng một hệ thống cho 3 nhóm người dùng.
- Tách rõ phần UI, dữ liệu và logic nghiệp vụ để dễ kết nối API sau này.

## 2.2. Nguyên tắc UX

### Ưu tiên hành động chính

Mỗi màn hình nên có một hành động chính rõ ràng.

Ví dụ:

- Trang chủ → `Tạo lô hàng mới`
- Tạo lô → `Tạo hồ sơ`
- QR → `Lưu / Chia sẻ QR`
- Bàn giao → `Xác nhận bàn giao`

### Hạn chế nhập liệu

Theo tài liệu nguồn:

- Tên nông sản có thể chọn từ danh sách.
- Có thể đề xuất nhận diện nông sản bằng AI qua ảnh.
- QR được dùng để giảm nhập liệu và đối chiếu thông tin.

**[ĐỀ XUẤT FE]** Ưu tiên dropdown/autocomplete trước khi triển khai AI nhận diện để MVP đơn giản hơn.

---

# 3. Kiến trúc thông tin FE

## 3.1. Các khu vực chính

```text
APP
├── Auth
│   ├── Đăng nhập
│   ├── Đăng ký
│   └── Quên mật khẩu
│
├── Sender / Người gửi hàng
│   ├── Trang chủ
│   ├── Tạo lô hàng
│   ├── Chi tiết lô hàng
│   ├── QR lô hàng
│   ├── Xác nhận bàn giao
│   ├── Lịch sử lô hàng
│   └── Thông báo
│
├── Driver / Tài xế
│   ├── Trang chủ
│   ├── Nhận hàng
│   ├── Giám sát chuỗi lạnh
│   ├── Cảnh báo AI
│   └── Bàn giao
│
└── Enterprise / Doanh nghiệp
    ├── Dashboard
    ├── Quản lý lô hàng
    ├── Giám sát chuỗi lạnh
    ├── Trung tâm cảnh báo AI
    ├── Theo dõi hành trình
    └── Báo cáo & phân tích
```

---

# 4. Navigation cho Người gửi hàng

**[ĐỀ XUẤT FE]**

Vì tài liệu mô tả một ứng dụng có nhiều thao tác liên tục, navigation nên thiết kế theo mobile-first.

### Bottom Navigation đề xuất

```text
┌─────────────────────────────────────┐
│                                     │
│              CONTENT                │
│                                     │
├─────────────────────────────────────┤
│  Trang chủ  │ Lô hàng │ Thông báo │ Cá nhân │
└─────────────────────────────────────┘
```

Có thể dùng:

- `Trang chủ`
- `Lô hàng`
- `Thông báo`
- `Cá nhân`

Nút `Tạo lô hàng mới` nên được đặt nổi bật trên Trang chủ.

> Nếu muốn MVP đơn giản hơn, có thể chỉ dùng `Trang chủ`, `Lô hàng`, `Thông báo`, `Cá nhân`; thao tác tạo lô nằm ở CTA chính trên Home.

---

# 5. Screen Flow — Người gửi hàng

## 5.1. Flow chính

```text
[Splash]
   ↓
[Đăng nhập]
   ├── Đăng ký
   └── Quên mật khẩu
   ↓
[Trang chủ]
   ↓
[Tạo lô hàng]
   ↓
[Kiểm tra thông tin]
   ↓
[QR lô hàng]
   ↓
[Xác nhận bàn giao]
   ↓
[Hoàn tất]
```

## 5.2. Flow xem lại

```text
[Trang chủ]
   ↓
[Lô hàng]
   ↓
[Chi tiết lô hàng]
   ├── QR
   ├── Trạng thái
   └── Thông tin bàn giao
```

---

# 6. Chi tiết từng màn hình

# 6.1. Màn hình 01 — Đăng nhập / Đăng ký

## Mục tiêu

Cho phép người gửi hàng truy cập hệ thống.

## Nội dung

Theo tài liệu:

- Số điện thoại
- Mật khẩu
- Đăng ký tài khoản chủ vựa hoặc điểm thu gom
- Quên mật khẩu
- Có thể sử dụng OTP thay cho mật khẩu

## Layout đề xuất

```text
┌─────────────────────────────┐
│          LOGO               │
│                             │
│     Quản lý nông sản        │
│                             │
│ Số điện thoại               │
│ [____________________]      │
│                             │
│ Mật khẩu                    │
│ [____________________]      │
│                             │
│       Quên mật khẩu?        │
│                             │
│ [       Đăng nhập       ]   │
│                             │
│ ─────── hoặc ─────────      │
│                             │
│ [     Đăng nhập OTP     ]   │
│                             │
│ Chưa có tài khoản?          │
│ Đăng ký                     │
└─────────────────────────────┘
```

**[ĐỀ XUẤT FE]**

Cho phép chuyển giữa:

- `Mật khẩu`
- `OTP`

bằng tab hoặc segmented control.

## States

- Default
- Loading
- Sai số điện thoại
- Sai mật khẩu
- OTP không hợp lệ
- OTP hết hạn
- Network error

---

# 6.2. Màn hình 02 — Trang chủ

## Mục tiêu

Người dùng nhìn thấy nhanh tình trạng các lô hàng và tạo lô mới.

## Nội dung bắt buộc

Theo tài liệu:

- Nút `Tạo lô hàng mới`
- Danh sách lô hàng
- Trạng thái:
  - Chờ vận chuyển
  - Đang vận chuyển
  - Đã bàn giao
- Thông báo hệ thống

## Layout đề xuất

```text
┌─────────────────────────────┐
│ Xin chào                    │
│ Chủ vựa / Điểm thu gom     │
│                         🔔  │
│                             │
│ [ + Tạo lô hàng mới ]       │
│                             │
│ Lô hàng của tôi             │
│                             │
│ ┌─────────────────────────┐ │
│ │ Thanh long              │ │
│ │ LOT-001                 │ │
│ │ 500 kg                  │ │
│ │ ● Chờ vận chuyển        │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Xoài                    │ │
│ │ LOT-002                 │ │
│ │ 800 kg                  │ │
│ │ ● Đang vận chuyển       │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ Home │ Lô hàng │ 🔔 │ Cá nhân│
└─────────────────────────────┘
```

## Component

- `Header`
- `NotificationButton`
- `PrimaryCTA`
- `ShipmentCard`
- `StatusBadge`
- `BottomNavigation`

---

# 6.3. Màn hình 03 — Tạo hồ sơ số lô hàng

## Mục tiêu

Nhập thông tin cần thiết để tạo hồ sơ số cho lô hàng.

## Fields

Theo tài liệu:

| Field | Loại UI đề xuất |
|---|---|
| Tên nông sản | Select / Searchable Select |
| Mã lô hàng | Text input |
| Nguồn gốc | Text input / Select |
| Ngày thu hoạch | Date picker |
| Khối lượng | Number input |
| Nhiệt độ ban đầu | Number input |
| Số lượng thùng | Number input |
| Thông tin đóng gói | Text input / textarea |

## AI nhận diện

Tài liệu đề xuất:

> Chụp ảnh nhận diện AI để tự điền tên nông sản.

**[ĐỀ XUẤT FE]**

Có thể thiết kế:

```text
Tên nông sản

[ Thanh long ▼ ]

hoặc

[ 📷 Nhận diện bằng ảnh ]
```

AI recognition nên được xem là tính năng mở rộng sau MVP nếu backend AI chưa sẵn sàng.

## Layout

```text
┌─────────────────────────────┐
│ ← Tạo lô hàng               │
│                             │
│ Tên nông sản *              │
│ [ Thanh long          ▼ ]   │
│                             │
│ [ 📷 Nhận diện bằng ảnh ]   │
│                             │
│ Mã lô hàng *                │
│ [ LOT-2026-001 ]            │
│                             │
│ Nguồn gốc *                 │
│ [ _____________________ ]   │
│                             │
│ Ngày thu hoạch              │
│ [ 06/10/2026          📅 ]  │
│                             │
│ Khối lượng                  │
│ [ 500 ] kg                  │
│                             │
│ Nhiệt độ ban đầu            │
│ [ 5 ] °C                    │
│                             │
│ Số lượng thùng              │
│ [ 50 ] thùng                │
│                             │
│ Thông tin đóng gói          │
│ [ _____________________ ]   │
│                             │
│ [      Tiếp tục         ]   │
└─────────────────────────────┘
```

## Validation

**[ĐỀ XUẤT FE]**

- Field bắt buộc phải được đánh dấu `*`.
- Khối lượng không được âm.
- Số lượng thùng không được âm.
- Ngày thu hoạch không được sai định dạng.
- Mã lô phải có giá trị.
- Hiển thị lỗi ngay dưới field.

---

# 6.4. Màn hình 04 — QR lô hàng

## Mục tiêu

Hiển thị QR riêng cho từng lô hàng.

## Nội dung

Theo tài liệu:

- QR riêng cho từng lô
- Mã lô
- Loại nông sản
- Khối lượng
- Lưu QR
- Chia sẻ QR

## Layout

```text
┌─────────────────────────────┐
│ ← Mã QR lô hàng             │
│                             │
│       MÃ QR                 │
│    ┌───────────────┐        │
│    │               │        │
│    │      QR       │        │
│    │               │        │
│    └───────────────┘        │
│                             │
│ LOT-2026-001                │
│ Thanh long                  │
│ 500 kg                      │
│                             │
│ [   Lưu QR   ] [ Chia sẻ ]  │
│                             │
│ [ Xác nhận bàn giao ]       │
└─────────────────────────────┘
```

## Component

- `QRCode`
- `ShipmentSummary`
- `SaveButton`
- `ShareButton`
- `PrimaryCTA`

---

# 6.5. Màn hình 05 — Xác nhận bàn giao

## Mục tiêu

Đối chiếu lô hàng với xe/tài xế và xác nhận bàn giao.

## Nội dung

Theo tài liệu:

- Thông tin xe
- Thông tin tài xế
- Quét QR để đối chiếu
- Khối lượng
- Thời gian bàn giao
- Nút xác nhận

## Flow

```text
[Chi tiết lô hàng]
       ↓
[Quét QR]
       ↓
[Đối chiếu]
       ↓
[Thông tin xe + tài xế]
       ↓
[Xác nhận khối lượng]
       ↓
[Xác nhận bàn giao]
       ↓
[Thành công]
```

## Layout

```text
┌─────────────────────────────┐
│ ← Xác nhận bàn giao         │
│                             │
│ Lô hàng                     │
│ LOT-2026-001                │
│ Thanh long · 500 kg         │
│                             │
│ Xe nhận hàng                │
│ 51A-123.45                  │
│                             │
│ Tài xế                      │
│ Nguyễn Văn A                │
│                             │
│ [ 📷 Quét QR đối chiếu ]    │
│                             │
│ Khối lượng bàn giao         │
│ [ 500 ] kg                  │
│                             │
│ Thời gian                   │
│ 06/10/2026 · 15:30          │
│                             │
│ [     Xác nhận bàn giao ]   │
└─────────────────────────────┘
```

## Success state

```text
✓ Bàn giao thành công

Lô LOT-2026-001 đã được bàn giao
cho tài xế.

[ Xem chi tiết lô hàng ]
[ Về trang chủ ]
```

---

# 6.6. Màn hình 06 — Lịch sử lô hàng

## Mục tiêu

Tra cứu các lô hàng đã tạo.

## Nội dung

Theo tài liệu:

- Danh sách lô hàng
- Tra cứu bằng mã lô
- Trạng thái vận chuyển
- Thời gian bàn giao

## Layout đề xuất

```text
┌─────────────────────────────┐
│ Lịch sử lô hàng             │
│                             │
│ [ 🔍 Nhập mã lô hàng... ]   │
│                             │
│ Tất cả ▼                    │
│                             │
│ ┌─────────────────────────┐ │
│ │ LOT-001                 │ │
│ │ Thanh long · 500 kg     │ │
│ │ Đã bàn giao             │ │
│ │ 06/10/2026 · 15:30      │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ LOT-002                 │ │
│ │ Xoài · 800 kg           │ │
│ │ Đang vận chuyển         │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

---

# 7. Component System

**[ĐỀ XUẤT FE]**

Nên xây component dùng lại thay vì thiết kế từng màn hình độc lập.

## 7.1. Layout

```text
AppShell
PageContainer
Header
BottomNavigation
```

## 7.2. Form

```text
Input
NumberInput
Select
SearchableSelect
DatePicker
Textarea
FormField
FormSection
```

## 7.3. Data display

```text
ShipmentCard
ShipmentSummary
StatusBadge
InfoRow
EmptyState
LoadingState
ErrorState
```

## 7.4. Action

```text
PrimaryButton
SecondaryButton
IconButton
ShareButton
ScanQRButton
```

## 7.5. Feedback

```text
Toast
Alert
ConfirmDialog
SuccessDialog
ErrorMessage
Skeleton
```

---

# 8. Trạng thái UI cần thiết

Mỗi màn hình có gọi dữ liệu nên chuẩn bị ít nhất:

## Loading

```text
Skeleton / Spinner
```

## Empty

Ví dụ:

```text
Bạn chưa có lô hàng nào.

[ + Tạo lô hàng mới ]
```

## Error

```text
Không thể tải dữ liệu.

[ Thử lại ]
```

## Success

Dùng cho:

- Tạo lô thành công
- Tạo QR thành công
- Bàn giao thành công
- Lưu/chia sẻ QR

---

# 9. Trạng thái lô hàng

Tài liệu xác định 3 trạng thái:

```text
CHỜ VẬN CHUYỂN
      ↓
ĐANG VẬN CHUYỂN
      ↓
ĐÃ BÀN GIAO
```

**[ĐỀ XUẤT FE]**

Tạo enum dùng chung:

```ts
type ShipmentStatus =
  | "pending"
  | "in_transit"
  | "delivered";
```

UI mapping:

```text
pending      → Chờ vận chuyển
in_transit   → Đang vận chuyển
delivered    → Đã bàn giao
```

Không nên hard-code text trạng thái ở từng component.

---

# 10. Data Model FE cơ bản

**[ĐỀ XUẤT FE]**

Model tối thiểu cho lô hàng:

```ts
interface Shipment {
  id: string;
  batchCode: string;
  productName: string;
  origin: string;
  harvestDate: string;
  weight: number;
  initialTemperature?: number;
  packageCount?: number;
  packagingInfo?: string;

  status:
    | "pending"
    | "in_transit"
    | "delivered";

  qrCode?: string;

  vehicle?: {
    plateNumber: string;
    driverName: string;
  };

  handover?: {
    weight: number;
    time: string;
  };
}
```

Model trên chỉ là cấu trúc FE đề xuất để frontend có thể phát triển độc lập trước khi API hoàn chỉnh.

---

# 11. Routing

**[ĐỀ XUẤT FE]**

Nếu dùng React/Next.js:

```text
/auth/login
/auth/register
/auth/forgot-password

/sender
/sender/shipments
/sender/shipments/new
/sender/shipments/[id]
/sender/shipments/[id]/qr
/sender/shipments/[id]/handover
/sender/notifications
/sender/profile
```

## Route logic

```text
Chưa đăng nhập
    ↓
/auth/login

Đã đăng nhập + role=sender
    ↓
/sender
```

Về sau có thể mở rộng:

```text
/driver/...
/enterprise/...
```

---

# 12. State Management

**[ĐỀ XUẤT FE]**

Không cần đưa toàn bộ dữ liệu vào global state.

## Local state

Dùng cho:

- Input form
- Modal
- Dropdown
- UI toggle
- QR dialog

## Server/API state

Dùng cho:

- Danh sách lô
- Chi tiết lô
- Trạng thái lô
- Thông tin bàn giao
- Thông báo

Nếu dùng React/Next.js, có thể sử dụng:

- React state cho UI đơn giản.
- TanStack Query hoặc giải pháp tương đương cho server state nếu dự án cần cache/refetch.

Đây là lựa chọn kỹ thuật đề xuất, không được quy định trong tài liệu nguồn.

---

# 13. Responsive Design

Tài liệu mô tả ứng dụng cho nông dân/chủ vựa, tài xế và doanh nghiệp.

**[ĐỀ XUẤT FE]**

Nên tách:

### Người gửi hàng

Ưu tiên:

```text
Mobile
↓
Tablet
```

### Tài xế

Ưu tiên:

```text
Mobile
```

### Doanh nghiệp

Ưu tiên:

```text
Desktop
↓
Tablet
```

Doanh nghiệp có dashboard, bản đồ, biểu đồ và báo cáo nên cần layout rộng hơn.

---

# 14. Accessibility & UX

**[ĐỀ XUẤT FE]**

- Button có kích thước đủ lớn để thao tác trên mobile.
- Không chỉ dùng màu để thể hiện trạng thái.
- Status nên có icon + text.
- Input có label rõ ràng.
- Error hiển thị gần field.
- Loading không làm mất context hiện tại.
- Confirmation cho hành động quan trọng như `Xác nhận bàn giao`.
- QR phải có kích thước đủ lớn để dễ quét.

---

# 15. Kiến trúc thư mục FE đề xuất

Nếu dùng Next.js App Router:

```text
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── sender/
│   │   ├── page.tsx
│   │   ├── shipments/
│   │   ├── notifications/
│   │   └── profile/
│   │
│   ├── driver/
│   └── enterprise/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── shipment/
│   ├── qr/
│   └── form/
│
├── features/
│   ├── auth/
│   ├── shipments/
│   ├── handover/
│   └── notifications/
│
├── hooks/
├── services/
├── types/
├── utils/
└── constants/
```

**[ĐỀ XUẤT FE]**

Tách `features` theo nghiệp vụ sẽ giúp sau này bổ sung Driver và Enterprise mà không làm toàn bộ code bị phụ thuộc lẫn nhau.

---

# 16. MVP Development Plan

## Phase 1 — Foundation

Mục tiêu:

- Setup project
- Design system
- Layout
- Routing
- Authentication UI
- Responsive base

Checklist:

```text
[ ] Project setup
[ ] Global styles
[ ] Typography
[ ] Spacing
[ ] Button
[ ] Input
[ ] Card
[ ] Badge
[ ] Header
[ ] Bottom navigation
[ ] Routing
```

---

# Phase 2 — Người gửi hàng Core

Ưu tiên đúng flow chính:

```text
[ ] Login
[ ] Register
[ ] Home
[ ] Shipment list
[ ] Create shipment
[ ] Shipment detail
[ ] QR
[ ] Handover
[ ] Handover success
[ ] History
```

Đây là phần FE quan trọng nhất của MVP.

---

# Phase 3 — UX States

```text
[ ] Loading
[ ] Empty
[ ] Error
[ ] Success
[ ] Validation
[ ] Confirmation dialog
[ ] Toast
```

---

# Phase 4 — API Integration

Khi backend có API:

```text
Auth
  ↓
Shipment API
  ↓
QR API
  ↓
Handover API
  ↓
Notification API
```

Frontend không nên phụ thuộc trực tiếp vào database.

---

# Phase 5 — Driver

Các màn hình theo tài liệu:

```text
[ ] Driver Home
[ ] Nhận hàng / QR scan
[ ] Giám sát chuỗi lạnh
[ ] Cảnh báo AI
[ ] Bàn giao hàng
```

Các dữ liệu chính:

- Chuyến hàng
- Điểm nhận
- Điểm giao
- Nông sản
- Mã lô
- Nhiệt độ
- Ngưỡng nhiệt độ
- Độ ẩm
- Thiết bị lạnh
- Cảnh báo
- Kết quả xử lý

---

# Phase 6 — Enterprise

Các màn hình:

```text
[ ] Dashboard
[ ] Quản lý lô hàng
[ ] Giám sát chuỗi lạnh
[ ] Trung tâm cảnh báo AI
[ ] Theo dõi hành trình
[ ] Báo cáo & phân tích
```

Các UI quan trọng:

```text
KPI cards
Map
Shipment table
Temperature chart
Alert center
Timeline
Report filters
Export actions
```

---

# 17. Enterprise Information Architecture

Tài liệu yêu cầu doanh nghiệp kiểm soát toàn trình.

## Dashboard

Hiển thị:

- Tổng số lô đang vận chuyển
- Lô bình thường
- Lô có nguy cơ
- Lô gặp sự cố
- Xe/container đang hoạt động
- Cảnh báo cần xử lý
- Bản đồ tổng quan

## Quản lý lô

Filter:

```text
Mã lô
Trạng thái
Tuyến đường
Mức độ rủi ro
```

## Giám sát chuỗi lạnh

Hiển thị:

```text
Nhiệt độ hiện tại
Ngưỡng yêu cầu
Độ ẩm
Trạng thái cảm biến
Biểu đồ nhiệt độ
Vị trí
Lịch sử biến động
```

## AI Alert Center

Mỗi alert nên có cấu trúc:

```text
VẤN ĐỀ
   ↓
MỨC ĐỘ
   ↓
NGUYÊN NHÂN / DẤU HIỆU
   ↓
HÀNH ĐỘNG TIẾP THEO
   ↓
NGƯỜI PHỤ TRÁCH
   ↓
TRẠNG THÁI XỬ LÝ
```

Điều này bám theo UX requirement trong tài liệu: cảnh báo không chỉ là thông báo đỏ mà phải cho biết vấn đề, mức độ và hành động tiếp theo.

---

# 18. Design System đề xuất

**[ĐỀ XUẤT FE — cần chốt bằng UI design trước khi code]**

## Màu sắc

Nên có semantic colors:

```text
Primary
Success
Warning
Danger
Info
Neutral
Background
Surface
Text
```

Không nên gắn màu trực tiếp vào từng component.

Ví dụ:

```text
Status/Pending     → Warning
Status/In Transit  → Info
Status/Delivered   → Success
Risk               → Danger
```

## Typography

Cần thống nhất:

```text
Display
Heading 1
Heading 2
Heading 3
Body
Caption
Label
Button
```

## Spacing

Dùng spacing scale thay vì tự nhập từng giá trị.

---

# 19. Component Dependency

Luồng component chính:

```text
AppShell
 ├── Header
 ├── PageContainer
 │
 ├── ShipmentList
 │    └── ShipmentCard
 │         ├── StatusBadge
 │         └── InfoRow
 │
 └── BottomNavigation
```

Form:

```text
ShipmentForm
 ├── FormSection
 ├── FormField
 │    ├── Input
 │    ├── Select
 │    ├── DatePicker
 │    └── NumberInput
 │
 └── PrimaryButton
```

Handover:

```text
HandoverScreen
 ├── ShipmentSummary
 ├── DriverInfo
 ├── VehicleInfo
 ├── QRScanner
 ├── HandoverForm
 └── ConfirmDialog
```

---

# 20. Ưu tiên màn hình khi thiết kế UI

## Priority P0 — Bắt buộc cho MVP

```text
1. Login
2. Home
3. Create Shipment
4. Shipment Detail
5. QR
6. Handover
7. Handover Success
```

## Priority P1

```text
8. Shipment History
9. Notifications
10. Profile
```

## Priority P2 — Mở rộng

```text
11. AI fruit recognition
12. Driver interfaces
13. Enterprise dashboard
14. Cold-chain monitoring
15. AI Alert Center
16. Reports
```

---

# 21. Thứ tự thiết kế Figma

Để tránh thiết kế rời rạc, nên đi theo thứ tự:

```text
01. Design tokens
      ↓
02. Components
      ↓
03. Auth
      ↓
04. Home
      ↓
05. Create Shipment
      ↓
06. Shipment Detail
      ↓
07. QR
      ↓
08. Handover
      ↓
09. History
      ↓
10. Prototype full flow
```

Sau khi flow Người gửi hàng ổn định mới thiết kế:

```text
Driver
   ↓
Enterprise
```

---

# 22. Prototype Flow cần test

Prototype tối thiểu:

```text
Login
  ↓
Home
  ↓
Tạo lô
  ↓
Nhập thông tin
  ↓
QR
  ↓
Xác nhận bàn giao
  ↓
Success
  ↓
Home
```

Test các tình huống:

### Case 1 — Tạo lô thành công

```text
Home
→ Create
→ Submit
→ QR
```

### Case 2 — Thiếu dữ liệu

```text
Create
→ Submit
→ Validation error
→ Fix
→ Submit
```

### Case 3 — Bàn giao

```text
QR
→ Handover
→ Scan/đối chiếu
→ Confirm
→ Success
```

### Case 4 — Không có dữ liệu

```text
Home
→ Empty state
→ Tạo lô hàng mới
```

---

# 23. Những điểm cần chốt trước khi code

Tài liệu nguồn chưa quy định chi tiết các vấn đề sau. Không nên tự coi đây là requirement đã được xác nhận.

## Cần quyết định

- [ ] Mobile app native hay web responsive/PWA?
- [ ] Có sử dụng OTP ngay từ MVP hay chỉ password?
- [ ] Design system/màu thương hiệu chính thức?
- [ ] Có cần dark mode?
- [ ] QR được tạo từ frontend hay backend?
- [ ] QR chứa URL hay ID lô hàng?
- [ ] QR scanner dùng camera native/browser?
- [ ] AI nhận diện nông sản có nằm trong MVP?
- [ ] Backend API contract?
- [ ] Authentication/token mechanism?
- [ ] Phân quyền role ở frontend?
- [ ] Notification realtime hay polling?
- [ ] Dữ liệu nhiệt độ lấy realtime từ thiết bị nào?
- [ ] Map provider?
- [ ] Chart library?
- [ ] Export PDF/Excel xử lý ở FE hay backend?

---

# 24. Kết luận — FE Roadmap

Kiến trúc FE nên được triển khai theo hướng:

```text
                    APP
                     │
          ┌──────────┼──────────┐
          │          │          │
       SENDER      DRIVER    ENTERPRISE
          │          │          │
          ↓          ↓          ↓
       Core MVP    Phase 2    Phase 3
```

Trong đó **Người gửi hàng là luồng nên hoàn thiện đầu tiên**:

```text
LOGIN
  ↓
HOME
  ↓
CREATE SHIPMENT
  ↓
SHIPMENT DETAIL
  ↓
QR
  ↓
HANDOVER
  ↓
SUCCESS
  ↓
HISTORY
```

Ưu tiên hiện tại không phải xây toàn bộ 3 nhóm cùng lúc. Nên hoàn thiện **design system + flow Người gửi hàng**, prototype toàn bộ luồng, sau đó mới mở rộng sang Driver và Enterprise.

## MVP FE Checklist

```text
[ ] Design tokens
[ ] Base components
[ ] Auth
[ ] Home
[ ] Shipment list
[ ] Create shipment
[ ] Shipment detail
[ ] QR
[ ] Handover
[ ] Success
[ ] History
[ ] Loading states
[ ] Empty states
[ ] Error states
[ ] Form validation
[ ] Responsive layout
[ ] Prototype complete flow
```
