import React from "react";
import { Pane, Table, Button, IconButton } from "evergreen-ui";
import SidebarComponent from "../../components/Sidebar";
import { ContextMenu } from "../../components/ContextMenu";
import { useContentList } from "../../hooks/useContentList";
import { useBloggersList } from "../../hooks/useBloggersList";
import { useArticleCategoriesList } from "../../hooks/useArticleCategoriesList";
import { useArticles } from "../../hooks/useArticles";
import { useOffers } from "../../hooks/useOffers";

export const TrashPage = () => {
  const {
    deletedContentList,
    restoreContent,
    permanentlyDeleteContent
  } = useContentList();

  const {
    deletedBloggersList,
    restoreBlogger,
    permanentlyDeleteBlogger
  } = useBloggersList();

  const {
    permanentlyDeleteCategory,
    restoreCategory,
    deletedCategories
  } = useArticleCategoriesList();

  const {
    deletedArticles,
    restoreArticle,
    permanentlyDeleteArticle
  } = useArticles();

  const {
    deletedOffers,
    permanentlyDeleteOffer,
    restoreOffer,
    deletedCompanies,
    permanentlyDeleteCompany,
    restoreCompany
  } = useOffers();

  return (
    <Pane display="flex">
      <SidebarComponent />

      <Pane flex={1}>
        <ContextMenu title="Papperskorg" />

        <Pane padding={20}>
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Sida</Table.TextHeaderCell>
              <Table.TextHeaderCell>Plats</Table.TextHeaderCell>
              <Table.TextHeaderCell>Borttaget</Table.TextHeaderCell>
              <Table.TextHeaderCell></Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height={240}>
              {deletedBloggersList.map(doc => (
                <Table.Row
                  key={doc.id}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.name}</Table.TextCell>
                  <Table.TextCell>{"Bloggare"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreBlogger(doc.id)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteBlogger(doc.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}

              {deletedContentList.map(doc => (
                <Table.Row
                  key={doc.id}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.id}</Table.TextCell>
                  <Table.TextCell>{"Infosidor"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreContent(doc.id)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteContent(doc.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
              {deletedCategories.map(doc => (
                <Table.Row
                  key={doc.id}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.translations.sv.title}</Table.TextCell>
                  <Table.TextCell>{"Artikelkategorier"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreCategory(doc.id)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteCategory(doc.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
              {deletedArticles.map(doc => (
                <Table.Row
                  key={doc.id}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.title}</Table.TextCell>
                  <Table.TextCell>{"Artikelkategorier"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreArticle(doc.id)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteArticle(doc.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}

              {deletedOffers.map(doc => (
                <Table.Row
                  key={doc.id}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.title}</Table.TextCell>
                  <Table.TextCell>{"Offers"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreOffer(doc.id)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteOffer(doc.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
              {deletedCompanies.map(doc => (
                <Table.Row
                  key={doc.name}
                  isSelectable
                  // onSelect={() => alert(profile.name)}
                >
                  <Table.TextCell>{doc.name}</Table.TextCell>
                  <Table.TextCell>{"Companies"}</Table.TextCell>
                  <Table.TextCell>{"-"}</Table.TextCell>
                  <Table.Cell>
                    <Button
                      marginRight={10}
                      onClick={() => restoreCompany(doc.name)}
                    >
                      Återställ
                    </Button>
                    <IconButton
                      appearance="primary"
                      intent="danger"
                      icon="trash"
                      onClick={() => permanentlyDeleteCompany(doc.name)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}

            </Table.Body>
          </Table>
        </Pane>
      </Pane>
    </Pane>
  );
};
