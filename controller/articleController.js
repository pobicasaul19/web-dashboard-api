import moment from 'moment';
import { uuid, counter } from '../utils/index.js';
import validationMessage from '../utils/validationError.js';
import articleSchema from '../models/articleModel.js';
import { loadArticleCollection, loadCompanyCollection } from '../config/db.js';
import { upload } from '../middleware/multerMiddleware.js';
import { mergeRequestData } from '../utils/mergeRequestData.js';

const schema = {
  ...articleSchema,
  file: {
    type: upload.single('file'),
    required: true,
    message: 'Image file is required.'
  }
};

// Get article lists
export const getArticles = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const article = articleCollection.data.articles
      .sort((a, b) => a.id - b.id);
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create article
export const createArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { company, title, link, date, content, status, writer, editor } = mergeRequestData(req);
    const file = req.file;

    const fields = {
      company,
      file,
      title,
      link,
      content
    };
    const context = { articleCollection };
    const errors = await validationMessage(fields, schema, context);
    errors && res.status(400).json({
      data: errors,
      metadata: {
        message: 'An error occurred while creating new article.'
      }
    });

    const fileUrl = `${req.protocol}://${req.get('host')}/assets/${file?.filename}`;
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = companyCollection.data.companies.find(t => t.name === company);
    const lastArticle = counter(articleCollection.data, 'articles');

    const newArticle = {
      uuid,
      id: lastArticle ? lastArticle.id + 1 : 1,
      company: selectedCompany?.name,
      image: fileUrl,
      title,
      link,
      date: date ? moment(date).format('MM/DD/YYYY') : moment(new Date()).format('MM/DD/YYYY'),
      content,
      status: status ?? 'For Edit',
      writer: writer ?? null,
      editor: editor ?? null,
    };

    articleCollection.data.articles.push(newArticle);
    await articleCollection.write();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit article
export const editArticle = async (req, res) => {
  try {
    const articleCollection = await loadArticleCollection();
    const { uuid } = req.params;
    const { company, title, link, date, content, status, writer, editor } = mergeRequestData(req);
    const file = req.file;

    const fields = {
      company,
      file,
      title,
      link,
      content
    };

    const errors = await validationMessage(fields, articleSchema);
    errors && res.status(400).json({
      data: errors,
      metadata: {
        message: 'An error occurred while updating the article.'
      }
    });

    let fileUrl = null;
    if (file) {
      fileUrl = `${req.protocol}://${req.get('host')}/assets/${file.filename}`;
    }
    const companyCollection = await loadCompanyCollection();
    const selectedCompany = companyCollection.data.companies.find(t => t.name === company);
    const articleIndex = articleCollection.data.articles.findIndex(t => t.uuid === uuid);
    articleCollection.data.articles[articleIndex] = {
      ...articleCollection.data.articles[articleIndex],
      company: selectedCompany.name,
      image: fileUrl || articleCollection.data.articles[articleIndex].image,
      title,
      link,
      date: moment(date).format('MM/DD/YYYY'),
      content,
      status,
      writer: writer ?? null,
      editor: editor === null ? null : editor
    };
    await articleCollection.write();
    res.status(200).json({
      data: { ...articleCollection.data.articles[articleIndex] },
      metadata: { message: 'Article updated successfully' }
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};