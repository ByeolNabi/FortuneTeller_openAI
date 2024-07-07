from openai import OpenAI

client = OpenAI(api_key="api키 입력해주세요")

fortune_type = "시험운"
user_message = "1999년 10월 2일"

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것을 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 시바점술사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
        {"role": "user", "content": f"당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것을 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 시바점술사입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 저는 당신에게 {fortune_type}에 대해서 물어보고 싶습니다."},
        {"role": "assistant", "content": f"물론입니다! 저는 당신의 {fortune_type}에 대해 자세하게 안내해 드릴 수 있습니다. {fortune_type}을 생년월일만 말해주시면 바로 {fortune_type}에 대해서 256토큰보다 짧게 대답해드리겠습니다."},
        {"role":"user" , "content": f"{user_message}"}
    ]
)

print({"message" : completion.choices[0].message.content})