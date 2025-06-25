import PageTitle from '@/components/PageTitle';
import PageFooter from '@/components/common/PageFooter';
import { Notice } from '@/types/notice';
import NoticeList from '@/app/(tabs)/notice/_components/NoticeList';
import NoticeEmpty from '@/app/(tabs)/notice/_components/NoticeEmpty';

interface NoticePageProps {
  notices: Notice[];
}

// TODO Scroll Paging
export default function NoticePage({ notices }: NoticePageProps) {
  return (
    <div>
      {/* Header */}
      <PageTitle title="Notice" subTitle="공지사항" />

      {/* List */}
      {!notices && <NoticeEmpty />}
      {notices && <NoticeList notices={notices} />}

      {/* Footer */}
      <PageFooter primaryText="공지사항 추가" primaryAction="/notice/create" />
    </div>
  );
}
