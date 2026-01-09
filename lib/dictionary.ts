export const dictionary = {
    en: {
        home: {
            title: "Hospital Patient Intake System",
            welcome: "Modern & Real-Time",
            patientFlow: "Patient Registration Flow",
            staffDash: "Staff Dashboard",
            start: "Start Journey",
            monitor: "Monitor Data",
            desc1: "Secure and fast registration for new patients.",
            desc2: "Real-time updates for hospital staff."
        },
        patient: {
            title: "New Patient Registration",
            backHome: "Back Home",
            firstName: "First Name",
            middleName: "Middle Name (Optional)",
            lastName: "Last Name",
            dob: "Date of Birth",
            gender: "Gender",
            phone: "Phone Number",
            email: "Email",
            address: "Address",
            language: "Preferred Language",
            nationality: "Nationality",
            emergency: "Emergency Contact (Optional)",
            name: "Name",
            relation: "Relationship",
            religion: "Religion (Optional)",
            submit: "Submit Registration",
            successTitle: "Registration Successful!",
            successDesc: "Thank you for submitting your details. Our staff has received your information.",
            status: "Submitted securely",
            submitAnother: "Submit Another",
            goHome: "Go Home"
        },
        staff: {
            title: "Staff Dashboard - Live Intake",
            waiting: "Waiting for patient activity...",
            backHome: "Back Home",
            openForm: "Open Patient Form",
            id: "ID",
            filling: "Filling Form...",
            submitted: "Submitted",
            livePreview: "Live Data Preview",
            name: "Name",
            phone: "Phone",
            email: "Email",
            gender: "Gender",
            dob: "DOB",
            addr: "Addr",
            status: "Status"
        },
        common: {
            select: "Select"
        },
        options: {
            gender: {
                male: "Male",
                female: "Female",
                other: "Other"
            },
            language: {
                english: "English",
                spanish: "Spanish",
                french: "French",
                thai: "Thai",
                chinese: "Chinese",
                other: "Other"
            },
            nationality: {
                thai: "Thai",
                american: "American",
                british: "British",
                chinese: "Chinese",
                other: "Other"
            },
            relation: {
                parent: "Parent",
                spouse: "Spouse",
                sibling: "Sibling",
                child: "Child",
                friend: "Friend",
                other: "Other"
            }
        }
    },
    th: {
        home: {
            title: "ระบบลงทะเบียนผู้ป่วย",
            welcome: "ทันสมัย & เรียลไทม์",
            patientFlow: "ขั้นตอนลงทะเบียนผู้ป่วย",
            staffDash: "แดชบอร์ดเจ้าหน้าที่",
            start: "เริ่มต้นใช้งาน",
            monitor: "ดูข้อมูล",
            desc1: "ลงทะเบียนรวดเร็วและปลอดภัยสำหรับผู้ป่วยใหม่",
            desc2: "อัปเดตข้อมูลแบบเรียลไทม์สำหรับเจ้าหน้าที่"
        },
        patient: {
            title: "ลงทะเบียนผู้ป่วยใหม่",
            backHome: "กลับหน้าหลัก",
            firstName: "ชื่อจริง",
            middleName: "ชื่อกลาง (ไม่บังคับ)",
            lastName: "นามสกุล",
            dob: "วันเกิด",
            gender: "เพศ",
            phone: "เบอร์โทรศัพท์",
            email: "อีเมล",
            address: "ที่อยู่",
            language: "ภาษาที่ต้องการ",
            nationality: "สัญชาติ",
            emergency: "ผู้ติดต่อฉุกเฉิน (ไม่บังคับ)",
            name: "ชื่อ",
            relation: "ความสัมพันธ์",
            religion: "ศาสนา (ไม่บังคับ)",
            submit: "ส่งข้อมูลลงทะเบียน",
            successTitle: "ลงทะเบียนสำเร็จ!",
            successDesc: "ขอบคุณที่ส่งข้อมูล เจ้าหน้าที่ได้รับเรียบร้อยแล้ว",
            status: "ส่งข้อมูลปลอดภัยแล้ว",
            submitAnother: "ส่งข้อมูลเพิ่ม",
            goHome: "กลับหน้าหลัก"
        },
        staff: {
            title: "แดชบอร์ดเจ้าหน้าที่ - รับข้อมูลสด",
            waiting: "กำลังรอข้อมูลผู้ป่วย...",
            backHome: "กลับหน้าหลัก",
            openForm: "เปิดแบบฟอร์มผู้ป่วย",
            id: "รหัส",
            filling: "กำลังกรอก...",
            submitted: "ส่งแล้ว",
            livePreview: "ตัวอย่างข้อมูลสด",
            name: "ชื่อ",
            phone: "โทร",
            email: "อีเมล",
            gender: "เพศ",
            dob: "วันเกิด",
            addr: "ที่อยู่",
            status: "สถานะ"
        },
        common: {
            select: "เลือก"
        },
        options: {
            gender: {
                male: "ชาย",
                female: "หญิง",
                other: "อื่นๆ"
            },
            language: {
                english: "อังกฤษ",
                spanish: "สเปน",
                french: "ฝรั่งเศส",
                thai: "ไทย",
                chinese: "จีน",
                other: "อื่นๆ"
            },
            nationality: {
                thai: "ไทย",
                american: "อเมริกัน",
                british: "อังกฤษ",
                chinese: "จีน",
                other: "อื่นๆ"
            },
            relation: {
                parent: "บิดา/มารดา",
                spouse: "คู่สมรส",
                sibling: "พี่น้อง",
                child: "บุตร",
                friend: "เพื่อน",
                other: "อื่นๆ"
            }
        }
    }
};

export type Locale = "en" | "th";
export type Dictionary = typeof dictionary.en;
