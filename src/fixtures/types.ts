export type Level = 'sd' | 'smp';

export type QuestionType = 'single' | 'multiple' | 'category';

export type QuestionStatus = 'draft' | 'published' | 'archived';

export type QuizType = 'practice' | 'tryout';

export type AccentBadgeColor = 'orange' | 'blue' | 'purple' | 'green';

export interface ElementItem {
  id: string;
  level: Level;
  name: string;
  slug: string;
  order: number;
  badgeColor: AccentBadgeColor;
  topicCount: number;
  questionCount: number;
}

export interface TopicItem {
  id: string;
  level: Level;
  elementId: string;
  elementName: string;
  elementBadgeColor: AccentBadgeColor;
  title: string;
  slug: string;
  description: string;
  videoId?: string;
  videoUrl?: string;
  practiceCount: number;
}

export interface ChoiceQuestionOption {
  kind: 'choice';
  key: string;
  labelHtml: string;
}

export interface CategoryStatementOption {
  kind: 'statement';
  statementId: string;
  statementHtml: string;
}

export type QuestionOption = ChoiceQuestionOption | CategoryStatementOption;

/**
 * STERILE ATTEMPT TYPE
 * Must NEVER contain answerKey, explanation, explanationHtml, shortsId/Url, longVideoId/Url, or isCorrect.
 */
export interface QuestionForAttempt {
  id: string;
  number: number;
  level: Level;
  elementName: string;
  topicTitle?: string;
  questionType: QuestionType;
  bodyHtml: string;
  imageUrl?: string;
  options: QuestionOption[];
}

export type StudentAnswerValue =
  | string
  | string[]
  | Record<string, boolean>
  | null;

export interface QuizAttemptMeta {
  id: string;
  slug: string;
  level: Level;
  type: QuizType;
  title: string;
  topicTitle?: string;
  topicSlug?: string;
  questionCount: number;
  durationMinutes?: number;
}

export interface SessionStudentUser {
  displayName: string;
  username: string;
}

export interface PracticeAttemptPageProps {
  level: Level;
  user: SessionStudentUser | null;
  quiz: QuizAttemptMeta;
  questions: QuestionForAttempt[];
  initialResponses?: Record<string, StudentAnswerValue>;
}

export interface TryoutLobbyPageProps {
  level: Level;
  user: SessionStudentUser | null;
  quiz: QuizAttemptMeta;
  rules: string[];
  hasCompletedAttempt: boolean;
}

export interface TryoutAttemptPageProps {
  level: Level;
  user: SessionStudentUser | null;
  quiz: QuizAttemptMeta;
  questions: QuestionForAttempt[];
  initialResponses: Record<string, StudentAnswerValue>;
  activeQuestionNumber: number;
  remainingSeconds: number;
  isDevMode: boolean;
}

export type ResultStatus = 'correct' | 'wrong' | 'unanswered';

export interface QuestionResultItem {
  id: string;
  number: number;
  elementName: string;
  questionType: QuestionType;
  bodyHtml: string;
  imageUrl?: string;
  options: QuestionOption[];
  status: ResultStatus;
  studentAnswer: StudentAnswerValue;
  studentAnswerLabel: string;
  answerKeyLabel: string;
  explanationHtml: string;
  shortsUrl?: string;
  longVideoUrl?: string;
  longVideoTimeLabel?: string;
}

export interface AttemptResultSummary {
  quizTitle: string;
  quizSlug: string;
  level: Level;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  totalQuestions: number;
  durationLabel?: string;
  encouragementText: string;
}

export interface PracticeResultPageProps {
  level: Level;
  user: SessionStudentUser | null;
  topicSlug: string;
  topicTitle: string;
  tryoutPromoSlug?: string;
  summary: AttemptResultSummary;
  items: QuestionResultItem[];
}

export interface TryoutResultPageProps {
  level: Level;
  user: SessionStudentUser | null;
  summary: AttemptResultSummary;
  items: QuestionResultItem[];
}

export interface HomePageProps {
  user: SessionStudentUser | null;
  sdElements: string[];
  smpElements: string[];
  youtubeChannelUrl: string;
}

export interface DashboardTryoutCardItem {
  id: string;
  slug: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
  status: 'not_started' | 'completed';
  lastScore?: number;
}

export interface DashboardTopicRowItem {
  topicId: string;
  topicSlug: string;
  title: string;
  practiceCount: number;
  totalQuestions: number;
  isCompleted: boolean;
  bestScore?: number;
}

export interface DashboardElementGroup {
  element: ElementItem;
  topics: DashboardTopicRowItem[];
}

export interface LevelDashboardPageProps {
  level: Level;
  user: SessionStudentUser | null;
  isDemoModeSwitchVisible: boolean;
  tryouts: DashboardTryoutCardItem[];
  elementGroups: DashboardElementGroup[];
}

export interface TopicPracticeCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  questionCount: number;
  estimatedMinutes: number;
  lastScore?: number;
}

export interface TopicDetailPageProps {
  level: Level;
  user: SessionStudentUser | null;
  topic: TopicItem;
  practices: TopicPracticeCardItem[];
  featuredTryoutSlug?: string;
}

export interface AuthPageProps {
  mode: 'register' | 'login';
  returnTo?: string;
  errorMessage?: string;
  fieldErrors?: Record<string, string>;
  defaultValues?: {
    displayName?: string;
    username?: string;
    parentConsent?: boolean;
  };
  supportWhatsappUrl: string;
}

export interface RawChoiceOption {
  key: string;
  textRaw: string;
}

export interface RawCategoryStatement {
  statementId: string;
  textRaw: string;
}

export type RawAnswerKey =
  | { questionType: 'single'; key: string }
  | { questionType: 'multiple'; keys: string[] }
  | { questionType: 'category'; answers: Record<string, boolean> };

export interface AdminQuestionRecord {
  id: string;
  code: string;
  level: Level;
  elementId: string;
  topicId: string | null;
  questionType: QuestionType;
  bodyRaw: string;
  imageUrl?: string;
  choiceOptionsRaw?: RawChoiceOption[];
  statementsRaw?: RawCategoryStatement[];
  answerKey: RawAnswerKey;
  explanationRaw: string;
  shortsId?: string;
  longVideoId?: string;
  longVideoSeconds?: number;
  status: QuestionStatus;
  source: 'manual' | 'ai';
  updatedAtLabel: string;
}

export interface AdminQuizRecord {
  id: string;
  slug: string;
  code: string;
  level: Level;
  type: QuizType;
  title: string;
  description: string;
  topicId: string | null;
  durationMinutes?: number;
  status: 'draft' | 'published';
  access: 'free' | 'premium';
  questionIds: string[];
}

export interface AdminStudentItem {
  id: string;
  displayName: string;
  username: string;
  createdAtLabel: string;
  sourceLabel: string;
  practiceAttemptCount: number;
  tryoutAttemptCount: number;
}

export interface AdminQuestionStatRow {
  questionNumber: number;
  questionCode: string;
  questionExcerpt: string;
  questionType: QuestionType;
  correctPercentage: number;
  mostChosenWrongLabel: string;
}

export interface AdminQuizReport {
  quizId: string;
  quizTitle: string;
  level: Level;
  quizType: QuizType;
  participantCount: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  questionStats: AdminQuestionStatRow[];
}
