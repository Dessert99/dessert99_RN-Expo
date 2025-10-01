import { getPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1, // 초기 페이지 1
    // 다음 페이지를 가져오는 함수
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

/*
useInfiniteQuery({...})
무한 페이지네이션 전용 훅. 내부에서 “다음 페이지 뭐야?”를 스스로 기억한다.

queryKey: [queryKeys.POST, queryKeys.GET_POSTS]
이 쿼리의 “이름표”. 같은 키면 캐시를 공유하고, 키가 바뀌면(예: 필터 변경) 완전히 다른 목록으로 취급한다.

queryFn: ({ pageParam }) => getPosts(pageParam)
실제 데이터를 가져오는 함수. pageParam이 현재 몇 페이지를 불러올지 숫자를 넘겨줘요.
→ 처음엔 initialPageParam 값(여기선 1)이 들어가고, 이후에는 getNextPageParam이 알려준 값이 들어가요.

initialPageParam: 1
첫 요청은 1페이지부터 시작.

getNextPageParam: (lastPage, allPages) => { ... }
“다음에 불러올 pageParam이 뭐냐?”를 계산하는 규칙.

lastPage[lastPage.length - 1]로 방금 가져온 페이지의 마지막 포스트가 있는지 봅니다.

마지막 포스트가 있으면 다음 page 번호로 allPages.length + 1을 리턴(즉 2, 3, 4…).

없으면 undefined를 리턴 → “더 불러올 페이지 없음”으로 판단해서 무한 스크롤 종료.
*/
