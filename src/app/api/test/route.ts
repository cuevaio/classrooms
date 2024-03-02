import { classrooms as cx } from "@/lib/classrooms";

export const GET = async () => {
  try {
    let xAuthToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MDg5MjgxMzYsInN1YiI6ImFudGhvbnkuY3VldmFAdXRlYy5lZHUucGUiLCJhdWRpZW5jZSI6InVuZGV0ZXJtaW5lZCIsImNyZWF0ZWQiOjE3MDg5MTM3MzY0Njh9.r_iCOTIIuW_m4duI3zqirWNAiuKFG5W1UYmsPpTSFR7eyrLPWOmMsLjL1V0ABwVMWV9EFwzAvgRrP_OQ3L-Hhw";
    let sessionId =
      "s%3AmFly2pmJI76znGBbh_UpHbm8C54FhqdO.h1IYGoyQT4aVv7d%2BQo%2BLRyfhyVMV%2FXeWnmXRXwNC3Eg";

    let classrooms = cx.map((classroom) => classroom.code);

    let titles: string[] = [];
    await Promise.all(
      classrooms.map(async (classroom) => {
        let payload = JSON.stringify({
          codAula: classroom,
          fechaInicial: "30/11/2023",
          fechaFinal: "29/11/2024",
        });

        let response = await fetch(
          "https://reserva-intranet.utec.edu.pe/events/",
          {
            method: "POST",
            body: payload,
            headers: {
              "X-Auth-Token": xAuthToken,
              Cookie: `sessionId=${sessionId}`,

              Accept: "application/json, text/plain, */*",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-US,en;q=0.6",
              "Content-Length": "70",
              "Content-Type": "application/json",
              Origin: "https://reserva-intranet.utec.edu.pe",
              Referer: "https://reserva-intranet.utec.edu.pe/reserva/aulalibre",
              "Sec-Ch-Ua":
                '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
              "Sec-Ch-Ua-Mobile": "?0",
              "Sec-Ch-Ua-Platform": "Windows",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
              "Sec-Gpc": "1",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            },
          }
        );

        if (!response.ok) {
          return Response.json(
            { error: "Failed to fetch events" },
            { status: 401 }
          );
        }

        let rawEvents = (await response.json()).content as {
          start: string;
          end: string;
          title: string;
        }[];

        for (let event of rawEvents) {
          if (!titles.includes(event.title)) {
            titles.push(event.title);
          }
        }
      })
    );

    return Response.json(titles);
  } catch (e) {
    console.error(e);
    return Response.json({ error: JSON.stringify(e) }, { status: 500 });
  }
};
