export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'CASH' | 'COUPON';
  percentage?: number;
  amount?: number;
};

// 支払額計算用の関数
export function calculateDeposit(total: number, payments: Payment[]): number {
  // 現金とクーポンの合計をそれぞれ計算する
  const { cashDeposit, couponDeposit } = payments.reduce(
    (acc, payment) => {
      if (payment.type === 'CASH') {
        acc.cashDeposit += payment.amount || 0;
      } else if (payment.type === 'COUPON') {
        if (payment.percentage != null) {
          acc.couponDeposit += Math.floor(total * (payment.percentage / 100));
        } else {
          acc.couponDeposit += payment.amount || 0;
        }
      }
      return acc;
    },
    { cashDeposit: 0, couponDeposit: 0 },
  );

  // クーポンの合計が合計金額を超えている、かつ現金支払いがある場合はエラーを起こす
  if (couponDeposit >= total && cashDeposit) throw new Error('OverCharge');

  const deposit = cashDeposit + couponDeposit;

  // 支払い額が足りない場合はエラーを起こす
  if (total > deposit) throw new Error('Shortage');

  return deposit;
}

// お釣り計算用の関数
export function calculateChange(total: number, deposit: number, payments: Payment[]): number {
  // クーポンのみで支払っている場合はお釣りは0
  const isCouponOnly = !payments.some((payment) => payment.type === 'CASH');

  return isCouponOnly ? 0 : deposit - total;
}

// 支払い額を計算してレシートを返す
export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const total = invoice.total;

  const deposit = calculateDeposit(total, payments);

  const change = calculateChange(total, deposit, payments);

  return { total, deposit, change } as Receipt;
}
