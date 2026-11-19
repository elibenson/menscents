from pathlib import Path
from html.parser import HTMLParser
import json,re,sys,urllib.parse,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.images=[];self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  for key in ('href','src'):
   if key in a and (tag in ('a','link','script','img') or tag=='source'):
    self.refs.append(a[key])
  if tag=='img':self.images.append(a)
errors=[];pages=list(root.rglob('*.html'));titles={}
for page in pages:
 txt=page.read_text(encoding='utf-8');p=Page();p.feed(txt)
 m=re.search(r'<title>(.*?)</title>',txt,re.I|re.S)
 if not m:errors.append(f'{page}: missing title')
 else:
  title=re.sub(r'\s+',' ',m.group(1));titles.setdefault(title,[]).append(page)
 if p.h1!=1:errors.append(f'{page}: expected one h1, got {p.h1}')
 if 'rel="canonical"' not in txt:errors.append(f'{page}: missing canonical')
 for img in p.images:
  if not img.get('alt') and img.get('alt')!='':errors.append(f'{page}: image without alt')
 for ref in p.refs:
  if ref.startswith(('http:','https:','mailto:','tel:','#','data:','javascript:')):continue
  path=urllib.parse.urlsplit(ref).path
  if not path:continue
  target=(page.parent/path).resolve()
  if not target.is_relative_to(root.resolve()) or not target.is_file():errors.append(f'{page}: missing {ref}')
 for match in re.findall(r'https?://(?:www\.)?amazon\.com/[^\s"<>]+',txt):
  url=urllib.parse.urlparse(match.replace('&amp;','&'))
  if urllib.parse.parse_qs(url.query).get('tag')!=['bnsn-20']:errors.append(f'{page}: Amazon tag missing {match[:100]}')
for title,ps in titles.items():
 if len(ps)>1:errors.append(f'duplicate title {title}: {ps}')
cat=json.loads((root/'assets/catalog.json').read_text())['fragrances']
if len(cat)<8:errors.append('catalog missing profiles')
for item in cat:
 if not (root/item['profileUrl']).is_file():errors.append(f'missing catalog profile {item["slug"]}')
js=(root/'assets/catalog.js').read_text()
if json.loads(js.split('=',1)[1].rstrip(';\n'))!=cat:errors.append('catalog.js and catalog.json out of sync')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
listed={x.text for x in ET.parse(root/'sitemap.xml').findall('.//s:loc',ns)}
for page in pages:
 if page.name=='404.html':continue
 url='https://menscents.com/'+str(page.relative_to(root)).replace('index.html','')
 if url not in listed:errors.append(f'not in sitemap {url}')
print(f'Checked {len(pages)} pages, {len(cat)} catalog entries, {len(list(root.rglob("*.webp")))} WebP assets')
for e in errors:print('ERROR:',e)
sys.exit(bool(errors))
