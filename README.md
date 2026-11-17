# Sponsor Media Hub

Landing page acadêmica estática. Execute `python -m http.server 8000` nesta pasta para testar em http://localhost:8000.

## Publicação

Publique esta pasta como a raiz de um repositório público próprio. Em Settings → Pages, selecione Deploy from a branch, branch main e /(root). Use a URL HTTPS exibida pelo GitHub Pages.

## Ativação dos canais e da mensuração

1. Em config.js, preencha instagram com o usuário sem @, whatsapp com o número público em formato internacional (55 + DDD + número) e gtm com o identificador GTM do contêiner web. Valores vazios deixam os recursos desativados. Use apenas identificadores públicos.
2. Na bio do Instagram, coloque a URL publicada com ?utm_source=instagram&utm_medium=organic_social&utm_campaign=projeto_academico&utm_content=bio.
3. No GTM, crie variáveis da camada de dados para smh_analytics, smh_marketing e profile. O site emite smh_consent_updated e whatsapp_click. Configure GA4 e Clarity para iniciar no evento de consentimento com smh_analytics igual a true. Configure o Meta Pixel e o PageView com smh_marketing igual a true. Use disparo uma vez por página nas tags de inicialização e desative duplicação de PageView. Configure verificações de consentimento nas tags e nos acionadores de clique. O evento whatsapp_click inclui apenas o perfil (patrocinador ou organizador), sem número ou mensagem. Para GA4, envie profile como parâmetro. Para Meta, use um evento personalizado WhatsAppClick. Nenhum clique representa envio confirmado de mensagem.
4. No Search Console, adicione a URL como propriedade de prefixo. Insira a meta tag de verificação fornecida pelo Google no head de index.html e publique. Depois de saber a URL final, crie sitemap.xml com as URLs absolutas da página e dos guias e envie o sitemap. Use o mesmo endereço para a inspeção de URL.
5. Em produção, teste consentimento recusado, aceite por categoria e retirada. Confira as tags no GTM Preview, GA4 DebugView, Clarity e Testar eventos da Meta. No celular, acesse o link com UTM, abra cada CTA e verifique a mensagem sugerida.

## Referências

Os guias HTML fornecidos acompanham o projeto. A imagem de vôlei é ilustrativa e foi gerada para a abertura. A folha de estilos prefere Inter quando instalada e usa a fonte do sistema na ausência da família.
