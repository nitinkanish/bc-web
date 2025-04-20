import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get dynamic params
    const title = searchParams.get("title") || "Himachal News"
    const description = searchParams.get("description") || "Latest news from Himachal Pradesh"
    const type = searchParams.get("type") || "article"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            backgroundColor: "#3b82f6",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              marginLeft: "10px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Himachal News
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <div
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "18px",
              textTransform: "uppercase",
            }}
          >
            {type}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#cbd5e1",
            }}
          >
            himachal-news.vercel.app
          </div>
        </div>
      </div>,
    )
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
