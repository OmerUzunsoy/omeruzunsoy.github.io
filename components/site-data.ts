export type ProjectPlatform = "Mobil" | "Web" | "Masaüstü" | "Otomasyon";
export type ProjectStatus = "Yayınlandı" | "Geliştiriliyor" | "Konsept";

export type Project = {
  slug: string;
  repoName: string;
  title: string;
  kind: string;
  year: string;
  description: string;
  tags: string[];
  platform: ProjectPlatform;
  status: ProjectStatus;
  featured?: boolean;
  order?: number;
  downloadUrl: string;
  downloadLabel: string;
  githubUrl: string;
  updatedAt?: string;
  homepage?: string;
};

export type ProjectMeta = {
  slug: string;
  repoName: string;
  title: string;
  kind: string;
  description: string;
  tags: string[];
  platform: ProjectPlatform;
  status: ProjectStatus;
  featured?: boolean;
  order: number;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  default_branch: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  fork: boolean;
  private: boolean;
};

export type GitHubReleaseAsset = {
  name: string;
  browser_download_url: string;
  updated_at?: string;
};

export const GITHUB_USERNAME = "OmerUzunsoy";

export const featuredProjectSlugs = [
  "uzunsiptv",
  "productcatalog-api",
  "streakkeeper",
  "e-ticaret-backend-jwt-auth",
] as const;

export const excludedRepoNames = ["OmerUzunsoy", "omeruzunsoy.github.io"];

export const stackItems = [
  {
    label: "Ana Omurga",
    title: "C# ve .NET",
    description:
      "Kütüphane otomasyonu, bankacılık simülasyonu, ürün katalogları ve masaüstü araçlar gibi işlerde güçlü bir uygulama omurgası kuruyorum.",
  },
  {
    label: "Backend Tarafı",
    title: "ASP.NET Core",
    description:
      "JWT doğrulama, REST API yapıları, veritabanı katmanı ve yönetilebilir servis mimarileri ile sağlam web altyapıları geliştiriyorum.",
  },
  {
    label: "Otomasyon",
    title: "Python Botları",
    description:
      "Telegram botları, takip sistemleri ve tekrar eden işleri hızlandıran yardımcı akışlarla otomasyon tarafında üretim yapıyorum.",
  },
  {
    label: "Ürün Yüzeyi",
    title: "Web, Mobil ve Masaüstü",
    description:
      "Sadece çalışan değil, düzenli görünen ve kullanması rahat hissettiren arayüzlerle fikri ürüne dönüştürüyorum.",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/OmerUzunsoy",
    handle: "@OmerUzunsoy",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/omer_uzunsoy55/",
    handle: "@omer_uzunsoy55",
  },
  {
    label: "X",
    href: "https://x.com/OmerUzunsoy55",
    handle: "@OmerUzunsoy55",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/%C3%B6mer-uzunsoy/",
    handle: "Ömer Uzunsoy",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/yceg59rz3mgjzasht17ypde1b?si=5a100e908694422b",
    handle: "Dinlediklerim",
  },
  {
    label: "E-posta",
    href: "mailto:uzunsoyomer@gmail.com",
    handle: "uzunsoyomer@gmail.com",
  },
] as const;

export const aboutParagraphs = [
  "Ben Ömer Uzunsoy. 19 yaşındayım ve Bilgisayar Programcılığı okuyorum. Kod tarafında en çok hoşuma giden şey, bir fikri gerçekten kullanılabilir bir ürüne dönüştürmek.",
  "Mobil uygulama, web arayüzü, otomasyon sistemi ya da backend fark etmiyor; doğru araçla doğru işi çıkarma tarafı beni motive ediyor. Yapay zeka araçlarını da sadece denemek için değil, üretim hızını ve kaliteyi artırmak için profesyonel biçimde kullanıyorum.",
  "GitHub tarafındaki projelerim arasında API'ler, masaüstü araçlar, botlar ve yayınlanmış uygulamalar var. Kısacası ben sadece kod yazmıyorum; işi toparlayan, hızlandıran ve kullanılabilir hale getiren sistemler kuruyorum.",
];

export const aboutHighlights = [
  "19 yaşında",
  "Bilgisayar Programcılığı öğrencisi",
  "Yapay zeka araçlarını profesyonel kullanırım",
  "Mobil, web, otomasyon ve backend odaklı üretirim",
];

export const projectMetaMap: Record<string, ProjectMeta> = {
  UzunsIPTV: {
    slug: "uzunsiptv",
    repoName: "UzunsIPTV",
    title: "UzunsIPTV",
    kind: "Mobil Uygulama",
    description:
      "Kotlin ile geliştirilen, doğrudan kullanılabilir Android yayın uygulaması.",
    tags: ["Kotlin", "Android", "Mobil"],
    platform: "Mobil",
    status: "Yayınlandı",
    featured: true,
    order: 1,
  },
  "ProductCatalog-API": {
    slug: "productcatalog-api",
    repoName: "ProductCatalog-API",
    title: "ProductCatalog API",
    kind: "Backend API",
    description:
      "ASP.NET Core, Entity Framework ve SQLite ile hazırlanmış ürün katalog yönetimi API altyapısı.",
    tags: ["C#", "ASP.NET Core", "SQLite"],
    platform: "Web",
    status: "Yayınlandı",
    featured: true,
    order: 2,
  },
  streakkeeper: {
    slug: "streakkeeper",
    repoName: "streakkeeper",
    title: "streakkeeper",
    kind: "Otomasyon Botu",
    description:
      "Telegram ve GitHub tarafında seri takibi yapan Python tabanlı yardımcı bot projesi.",
    tags: ["Python", "Telegram", "Bot"],
    platform: "Otomasyon",
    status: "Yayınlandı",
    featured: true,
    order: 3,
  },
  "E-Ticaret-Backend-JWT-Auth-": {
    slug: "e-ticaret-backend-jwt-auth",
    repoName: "E-Ticaret-Backend-JWT-Auth-",
    title: "E-Ticaret Backend JWT Auth",
    kind: "Backend Sistemi",
    description:
      "JWT doğrulama ve kullanıcı akışına odaklanan güvenli e-ticaret backend yapısı.",
    tags: ["C#", "JWT", "ASP.NET Core"],
    platform: "Web",
    status: "Yayınlandı",
    featured: true,
    order: 4,
  },
  F1BotProjesi: {
    slug: "f1botprojesi",
    repoName: "F1BotProjesi",
    title: "F1BotProjesi",
    kind: "Bilgi Botu",
    description:
      "Formula 1 odaklı bilgi, bildirim ve otomasyon akışı sağlayan Telegram bot deneyimi.",
    tags: ["Python", "Telegram", "F1"],
    platform: "Otomasyon",
    status: "Yayınlandı",
    featured: true,
    order: 5,
  },
  Kutuphane_Otomasyonu: {
    slug: "kutuphane-otomasyonu",
    repoName: "Kutuphane_Otomasyonu",
    title: "Kütüphane Otomasyonu",
    kind: "Masaüstü Sistem",
    description:
      "Kitap takibi, kullanıcı işlemleri ve ödünç akışı için tasarlanmış masaüstü otomasyon çözümü.",
    tags: ["C#", ".NET", "Otomasyon"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    featured: true,
    order: 6,
  },
  "FilmArsivi-API": {
    slug: "filmarsivi-api",
    repoName: "FilmArsivi-API",
    title: "FilmArşivi API",
    kind: "CRUD API",
    description:
      "Film arşivi yönetimi için hazırlanmış servis katmanlı REST API projesi.",
    tags: ["C#", "REST API", "CRUD"],
    platform: "Web",
    status: "Yayınlandı",
    order: 7,
  },
  ConsoleBank: {
    slug: "consolebank",
    repoName: "ConsoleBank",
    title: "ConsoleBank",
    kind: "Konsol Uygulaması",
    description:
      "Temel bankacılık akışlarını simüle eden C# konsol uygulaması.",
    tags: ["C#", "Console", ".NET"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    order: 8,
  },
  "OgrenciPortfoy-WebVizeSinavi": {
    slug: "ogrenciportfoy-webvizesinavi",
    repoName: "OgrenciPortfoy-WebVizeSinavi",
    title: "Öğrenci Portföy Web",
    kind: "MVC Web Projesi",
    description:
      "ASP.NET Core MVC ile hazırlanmış, sayfa akışına odaklanan portföy uygulaması.",
    tags: ["ASP.NET Core", "MVC", "Web"],
    platform: "Web",
    status: "Yayınlandı",
    order: 9,
  },
  LibraryManager: {
    slug: "librarymanager",
    repoName: "LibraryManager",
    title: "LibraryManager",
    kind: "Yönetim Aracı",
    description:
      "Kayıt süreçlerini ve kütüphane verilerini düzenlemek için hazırlanmış yönetim aracı.",
    tags: ["C#", "Yönetim", ".NET"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    order: 10,
  },
  NoteTaker: {
    slug: "notetaker",
    repoName: "NoteTaker",
    title: "NoteTaker",
    kind: "Not Uygulaması",
    description:
      "Hızlı not alma ve düzenli içerik takibi için hazırlanmış sade masaüstü uygulaması.",
    tags: ["C#", "Notlar", "Masaüstü"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    order: 11,
  },
  "UzunsClicker-V2": {
    slug: "uzunsclicker-v2",
    repoName: "UzunsClicker-V2",
    title: "UzunsClicker V2",
    kind: "Araç Uygulaması",
    description:
      "Hızlı tekrar eden tıklama akışı için hazırlanmış Windows masaüstü aracı.",
    tags: ["Windows", "Tool", "Desktop"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    order: 12,
  },
  UzunSClicker: {
    slug: "uzunsclicker",
    repoName: "UzunSClicker",
    title: "UzunSClicker",
    kind: "Masaüstü Araç",
    description:
      "Doğrudan kullanılabilir, hafif ve pratik bir Windows yardımcı aracı.",
    tags: ["Windows", "EXE", "Utility"],
    platform: "Masaüstü",
    status: "Yayınlandı",
    order: 13,
  },
  SONESPOR: {
    slug: "sonespor",
    repoName: "SONESPOR",
    title: "SONESPOR",
    kind: "Web Projesi",
    description:
      "Kullanıcı akışı ve içerik düzeni tarafına odaklanan web tabanlı proje denemesi.",
    tags: ["Web", "Frontend"],
    platform: "Web",
    status: "Yayınlandı",
    order: 14,
  },
  "esila-icin-site": {
    slug: "esila-icin-site",
    repoName: "esila-icin-site",
    title: "Esila İçin Site",
    kind: "Kişisel Web Projesi",
    description:
      "Kişisel kullanım için hazırlanmış küçük ölçekli özel web projesi.",
    tags: ["Web", "Frontend"],
    platform: "Web",
    status: "Yayınlandı",
    order: 15,
  },
  "esila-icin-site-g": {
    slug: "esila-icin-site-g",
    repoName: "esila-icin-site-g",
    title: "Esila İçin Site G",
    kind: "Web Projesi",
    description:
      "Özel kullanım amacıyla hazırlanmış ikinci web yüzeyi denemesi.",
    tags: ["Web", "UI"],
    platform: "Web",
    status: "Yayınlandı",
    order: 16,
  },
};

const DEFAULT_REPO_DESCRIPTION =
  "Kaynak kodu GitHub üzerinde yer alan, farklı ürün ihtiyaçlarına göre geliştirilmiş proje.";

function formatRepoTitle(repoName: string) {
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(repoName: string) {
  return repoName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferPlatform(repo: GitHubRepo): ProjectPlatform {
  const name = repo.name.toLowerCase();
  const language = repo.language?.toLowerCase() ?? "";

  if (name.includes("bot") || language === "python") return "Otomasyon";
  if (language === "kotlin" || name.includes("iptv")) return "Mobil";
  if (
    name.includes("clicker") ||
    name.includes("manager") ||
    name.includes("console") ||
    name.includes("note") ||
    name.includes("kutuphane")
  ) {
    return "Masaüstü";
  }

  return "Web";
}

function inferKind(repo: GitHubRepo, platform: ProjectPlatform) {
  if (platform === "Otomasyon") return "Otomasyon Projesi";
  if (platform === "Mobil") return "Mobil Uygulama";
  if (platform === "Masaüstü") return "Masaüstü Uygulama";
  return "Web Projesi";
}

function buildZipDownloadUrl(repo: GitHubRepo) {
  return `https://github.com/${GITHUB_USERNAME}/${repo.name}/archive/refs/heads/${repo.default_branch}.zip`;
}

function inferDownloadLabel(assetName?: string | null) {
  const normalized = assetName?.toLowerCase() ?? "";

  if (normalized.endsWith(".apk")) return "APK İndir";
  if (normalized.endsWith(".exe")) return "EXE İndir";
  if (normalized.endsWith(".msi")) return "MSI İndir";
  if (normalized.endsWith(".zip")) return "ZIP İndir";
  return "ZIP İndir";
}

export function getFallbackProjects() {
  return Object.values(projectMetaMap)
    .sort((a, b) => a.order - b.order)
    .map((meta) => ({
      slug: meta.slug,
      repoName: meta.repoName,
      title: meta.title,
      kind: meta.kind,
      year: "2025",
      description: meta.description,
      tags: meta.tags,
      platform: meta.platform,
      status: meta.status,
      featured: meta.featured,
      order: meta.order,
      downloadUrl: `https://github.com/${GITHUB_USERNAME}/${meta.repoName}/archive/refs/heads/main.zip`,
      downloadLabel: "ZIP İndir",
      githubUrl: `https://github.com/${GITHUB_USERNAME}/${meta.repoName}`,
    }));
}

export function mergeGitHubProjects(
  repos: GitHubRepo[],
  releasesByRepo: Record<string, GitHubReleaseAsset | null>,
) {
  const visibleRepos = repos.filter(
    (repo) =>
      !repo.private && !repo.fork && !excludedRepoNames.includes(repo.name),
  );

  const merged = visibleRepos.map((repo) => {
    const meta = projectMetaMap[repo.name];
    const platform = meta?.platform ?? inferPlatform(repo);
    const releaseAsset = releasesByRepo[repo.name];
    const downloadUrl = releaseAsset?.browser_download_url ?? buildZipDownloadUrl(repo);
    const downloadLabel = inferDownloadLabel(releaseAsset?.name);

    return {
      slug: meta?.slug ?? slugify(repo.name),
      repoName: repo.name,
      title: meta?.title ?? formatRepoTitle(repo.name),
      kind: meta?.kind ?? inferKind(repo, platform),
      year: String(new Date(repo.pushed_at || repo.updated_at).getFullYear()),
      description:
        meta?.description ?? repo.description ?? DEFAULT_REPO_DESCRIPTION,
      tags:
        meta?.tags ??
        [repo.language, platform].filter(Boolean) as string[],
      platform,
      status: meta?.status ?? "Yayınlandı",
      featured: meta?.featured ?? false,
      order: meta?.order ?? 999,
      downloadUrl,
      downloadLabel,
      githubUrl: repo.html_url,
      updatedAt: repo.updated_at,
      homepage: repo.homepage ?? undefined,
    } satisfies Project;
  });

  return merged.sort((left, right) => {
    const leftFeaturedIndex = featuredProjectSlugs.indexOf(
      left.slug as (typeof featuredProjectSlugs)[number],
    );
    const rightFeaturedIndex = featuredProjectSlugs.indexOf(
      right.slug as (typeof featuredProjectSlugs)[number],
    );

    const leftFeatured = leftFeaturedIndex !== -1;
    const rightFeatured = rightFeaturedIndex !== -1;

    if (leftFeatured && rightFeatured) {
      return leftFeaturedIndex - rightFeaturedIndex;
    }

    if (leftFeatured) return -1;
    if (rightFeatured) return 1;

    if ((left.order ?? 999) !== (right.order ?? 999)) {
      return (left.order ?? 999) - (right.order ?? 999);
    }

    return new Date(right.updatedAt ?? 0).getTime() - new Date(left.updatedAt ?? 0).getTime();
  });
}

export const projectPlatforms = ["Hepsi", "Mobil", "Web", "Masaüstü", "Otomasyon"] as const;
export const projectStatuses = ["Hepsi", "Yayınlandı", "Geliştiriliyor", "Konsept"] as const;
