export interface FormData {
  // Step 1: Personal Information
  fullName: string;
  cnic: string;
  mobileNo: string;
  gender: string;
  dob: string;
  province: string;
  address: string;

  // Step 2: Bank Information
  loanAmount: string;
  loanPurpose: string;
  occupation: string;
  bankName: string;
  accountNumber: string;
  monthlyIncome: string;

  // Step 3: Payment & Transaction
  transactionId: string;
  screenshotFile: File | null;
  screenshotPreviewUrl: string;
}

export type StepNumber = 1 | 2 | 3 | 4;
