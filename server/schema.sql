
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    reference TEXT UNIQUE NOT NULL,
    product_slug TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    amount_kobo BIGINT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    payment_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'paid', 'failed')),
    access_token_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS orders_email_idx
ON orders (customer_email);

CREATE TABLE IF NOT EXISTS survey_submissions (
    id BIGSERIAL PRIMARY KEY,
    customer_email TEXT,
    answers JSONB NOT NULL,
    score INTEGER NOT NULL,
    result_category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS survey_created_at_idx
ON survey_submissions (created_at DESC);
